# Melbourne Housing Insights ASSIGNMENT

This web application provides users with insights into Melbourne's housing market through predictive modeling and interactive data visualization. It allows users to input property-related data, receive a price prediction, and visualize trends based on historical data. The app consists of a frontend built with React and a backend API developed using FastAPI.

## Key Features

### User Input Form

- **User-Friendly Form**: Allows users to input data related to a property, such as distance from the CBD, landsize, number of rooms, bedrooms, bathrooms, car spaces, postcode, and year built.
- **Real-Time Validation**: Validates user inputs, ensuring that values like postcode, rooms, and other numerical fields follow predefined conditions. The application provides error messages when invalid data is entered, improving data accuracy.
- **API Integration**: The form submits data to the backend API for processing, which returns a price prediction and crime rate incidents based on the provided postcode.

### Predictive Model

- **Price Prediction**: Utilizes a pre-trained machine learning model to provide users with an estimated property price based on input data.
- **Backend API**: The FastAPI backend handles requests, performs preprocessing on the input data, and leverages a saved model to generate predictions. It also integrates data from external CSV files (e.g., housing and crime data) to support the visualizations.

### Data Visualization

- **Interactive Charts**: The Insights page offers three different chart types:
  - **Bar Chart**: Displays crime incidents for the input postcode over various years.
  - **Line Chart**: Shows the trend of average house prices in Melbourne across different months, ordered chronologically.
  - **Pie Chart**: Highlights property distribution by suburb, offering a quick overview of where properties are concentrated.
- **Responsive Design**: The charts are interactive, supporting zoom, tooltip hover, and filtering for a rich user experience.

### Team Information

The **Team Section** introduces the project team members:

- **Vu Duc Tran** 
- **Manh Dung Nguyen** 
- **Tran Quang Minh Nguyen** 

## Project Structure

frontend/
├── src/
│ ├── components/
│ │ ├── HeroSection.js # the homepage
│ │ ├── SearchForm.js # input form for predictions
│ │ ├── TeamSection.js # team member
│ │ └── PricingPlans.js # section for potential pricing plans
│ ├── pages/
│ │ ├── About.js # about page with team information
│ │ ├── Home.js # home page including the main form and insights link
│ │ └── Insight.js # insights page showing charts
├── public/
│ ├── index.html # main html template
│ └── images/ # images

backend/
│ ├── main.py # FastAPI backend script
│ ├── trained_model.py # model file for predictions
data/
│ ├── Melbourne_housing.csv # housing dataset
│ └── Melbourne_crime_rate.csv # crime dataset

└── README.md # project documentation

## Installation

Prerequisites
Node.js and npmPython 3.8+FastAPI and related Python libraries (see requirements.txt)

## Backend Setup

cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

Access API: The FastAPI will be available at http://localhost:8000.

## Frontend Setup

cd frontend
npm install
npm start

the Frontend will be available at http://localhost:3000/

## Usage

Launch the frontend and input property details to receive a price prediction.
Click on "View Insights" to see crime rate and housing trend visualizations based on your input data.
Explore Team Profiles to learn more about the developers.

# Required Libraries

This project requires a set of libraries for both the backend and frontend to ensure smooth functionality.

## Backend Libraries (Python - FastAPI)

1. **FastAPI**: Web framework for building APIs.
   ```bash
   pip install fastapi
   ```
2. **Uvicorn**: ASGI server to run FastAPI.
   pip install uvicorn
3. **pandas**: Data manipulation and analysis.
   pip install pandas
4. **joblib**: Model serialization and deserialization.
   pip install joblib

5. **numpy**: Mathematical operations and data handling.
   pip install numpy

6. **scikit-learn**: Machine learning library for the trained model.
   pip install scikit-learn

7. **pydantic**: Data validation and serialization in FastAPI.
   pip install pydantic

## Frontend Libraries (JavaScript - React)

1. **React**: Library for building the user interface.
   npm install react

2. **React Router**: Routing for navigating between pages.
   npm install react-router-dom

3. **Axios**: Promise-based HTTP client for making API requests.
   npm install axios

4. **Chart.js**: Data visualization library for rendering charts.
   npm install chart.js

5. **react-chartjs-2**: React wrapper for Chart.js.
   npm install react-chartjs-2

6. **Development Libraries (Optional)**
   dotenv: For managing environment variables (optional).
   npm install dotenv

## Delete node_modules

rm -rf node_modules package-lock.json
