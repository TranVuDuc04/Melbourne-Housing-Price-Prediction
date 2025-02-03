from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Load pre-trained model
try:
    model = joblib.load("model.joblib")
except FileNotFoundError:
    raise HTTPException(
        status_code=500, 
        detail="The model file is missing. Please make sure 'model.joblib' is in the correct path."
    )

# Load crime rate data
try:
    housing_data = pd.read_csv("../data/Melbourne_housing.csv")
    crime_data = pd.read_csv("../data/Melbourne_crime_rate.csv")
except FileNotFoundError:
    raise HTTPException(
        status_code=500, 
        detail="One or more data files are missing. Please ensure that the housing and crime rate CSV files are available."
    )

# Enable CORS for localhost frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define structure for input data
class InputData(BaseModel):
    Distance: float
    Landsize: float
    Rooms: int
    Bedroom2: int
    Bathroom: float
    Car: float
    Postcode: int
    YearBuilt: int
    IncidentsRecorded: int

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "Server is up and running"}

# Prediction endpoint
@app.post("/predict")
async def predict(data: InputData):
    # Prepare input data as a DataFrame for the model
    input_df = pd.DataFrame([data.dict()])
    
    # Log transformations on certain columns as per model training
    input_df['Distance'] = np.log(input_df['Distance'] + 1)
    input_df['Landsize'] = np.log(input_df['Landsize'] + 1)
    
    # Align input with model columns
    required_columns = model.feature_names_in_
    input_df = pd.get_dummies(input_df).reindex(columns=required_columns, fill_value=0)
    
    # Make prediction
    try:
        prediction_log_price = model.predict(input_df)
        prediction_price = np.exp(prediction_log_price)
        return {"prediction": prediction_price[0]}
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"An error occurred while making the prediction. Please try again. Details: {str(e)}"
        )

# Endpoint to get crime incidents by postcode
@app.get("/incidents/{postcode}")
async def get_incidents(postcode: int):
    # Filter for the given postcode and get the latest year record
    latest_record = crime_data[crime_data['Postcode'] == postcode].sort_values(
        by='Year ending December', ascending=False
    ).head(1)

    if latest_record.empty:
        raise HTTPException(
            status_code=404, 
            detail="No crime incident data found for the provided postcode. Please check the postcode and try again."
        )

    incidents = int(latest_record['Incidents Recorded'].values[0])
    return {"incidents": incidents}

# Line Chart for Average House Price over Dates, with optional postcode filtering
@app.get("/chart-data/line")
async def get_line_chart_data(postcode: int = Query(None)):
    # Filter by postcode if provided
    if postcode:
        filtered_data = housing_data[housing_data["Postcode"] == postcode]
    else:
        filtered_data = housing_data
    
    # Ensure 'Date' column is available and parse dates
    if 'Date' not in filtered_data.columns:
        raise HTTPException(
            status_code=500, 
            detail="The 'Date' column is missing from the housing data. Please check the data file."
        )
    
    # Parse and format dates, and filter any invalid dates
    filtered_data['Date'] = pd.to_datetime(filtered_data['Date'], errors='coerce')
    filtered_data = filtered_data.dropna(subset=['Date', 'Price'])  # Remove rows with NaN in Date or Price
    
    # Filter out any out-of-range values 
    filtered_data = filtered_data[filtered_data['Price'] > 0]
    
    # Sort by Date column in ascending order
    filtered_data = filtered_data.sort_values(by="Date", ascending=True)
    
    # Group by formatted date and compute the average price
    line_grouped = filtered_data.groupby(filtered_data['Date'].dt.strftime('%m/%Y'))["Price"].mean().reset_index()
    
    # Sort by the original Date column to ensure chronological order after grouping
    line_grouped['Date'] = pd.to_datetime(line_grouped['Date'], format='%m/%Y')
    line_grouped = line_grouped.sort_values(by="Date", ascending=True)

    return {
        "labels": line_grouped["Date"].dt.strftime('%m/%Y').tolist(),
        "values": line_grouped["Price"].tolist()
    }

# Bar Chart for Incidents Recorded over Years for a specific postcode
@app.get("/chart-data/bar")
async def get_bar_chart_data(postcode: int = Query(None)):
    if postcode is None:
        raise HTTPException(
            status_code=400, 
            detail="The 'postcode' parameter is missing. Please include a valid postcode in your request."
        )

    bar_data = crime_data[crime_data['Postcode'] == postcode].dropna(
        subset=["Year ending December", "Incidents Recorded"]
    )
    bar_grouped = bar_data.groupby("Year ending December")["Incidents Recorded"].sum().reset_index()
    bar_grouped = bar_grouped.sort_values(by="Year ending December", ascending=True)
    
    return {
        "labels": bar_grouped["Year ending December"].tolist(),
        "values": bar_grouped["Incidents Recorded"].tolist()
    }

# Pie Chart for Property Distribution by Suburb
@app.get("/chart-data/pie")
async def get_pie_chart_data():
    suburb_counts = housing_data["Suburb"].value_counts().head(5)
    return {
        "labels": suburb_counts.index.tolist(),
        "values": suburb_counts.values.tolist()
    }
