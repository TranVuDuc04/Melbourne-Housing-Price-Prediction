import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load the main dataset
file_path = '../data/Melbourne_housing.csv'
data = pd.read_csv(file_path)

# drop unnecessary columns and rows with NaN values
data = data.drop(columns=['Address', 'Method', 'SellerG', 'Date', 'CouncilArea', 'Regionname', 'BuildingArea', 'YearBuilt'])
data.dropna(inplace=True)

# drop duplicates
data = data.drop_duplicates().reset_index(drop=True)

# one-hot encode 'Suburb' and 'Type' columns
data = pd.get_dummies(data, columns=['Suburb', 'Type'])

# remove outliers
Q1 = data[['Distance', 'Landsize', 'Price']].quantile(0.25)
Q3 = data[['Distance', 'Landsize', 'Price']].quantile(0.75)
IQR = Q3 - Q1
outlier_condition = ((data[['Distance', 'Landsize', 'Price']] < (Q1 - 1.5 * IQR)) |
             (data[['Distance', 'Landsize', 'Price']] > (Q3 + 1.5 * IQR))).any(axis=1)

# filter out rows that match the condition
data = data[outlier_condition]

# load the crime data
file_path = '../data/Melbourne_crime_rate.csv'
crime_data = pd.read_csv(file_path)

# filter crime data and keep relevant postcodes
crime_data_filtered = crime_data[(crime_data['Year ending December'] >= 2016) & (crime_data['Year ending December'] <= 2018)]
melbourne_postcodes = list(range(3000, 3002)) + list(range(3149, 3208)) + list(range(3011, 3045)) + list(range(3101, 3149)) + list(range(3047, 3101))
crime_data_filtered = crime_data_filtered[crime_data_filtered['Postcode'].isin(melbourne_postcodes)]
crime_data_filtered = crime_data_filtered.drop_duplicates()
crime_data_filtered['Incidents Recorded'] = pd.to_numeric(crime_data_filtered['Incidents Recorded'], errors='coerce')
crime_agg = crime_data_filtered.groupby('Postcode').agg({'Incidents Recorded': 'sum'}).reset_index()

data['Postcode'] = data['Postcode'].astype(int)
crime_agg['Postcode'] = crime_agg['Postcode'].astype(int)
merged_data = pd.merge(data, crime_agg[['Postcode', 'Incidents Recorded']], on='Postcode', how='left')
merged_data = merged_data.dropna()

# apply log transformation to specified columns
merged_data['Distance'] = np.log(merged_data['Distance'] + 1)
merged_data['Landsize'] = np.log(merged_data['Landsize'] + 1)
merged_data['Price'] = np.log(merged_data['Price'] + 1)

# separate features and target variable, and split the data
X = merged_data.drop(['Price'], axis=1)
X = pd.get_dummies(X)
y = merged_data['Price']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2209)

# train model and save it
forest = RandomForestRegressor()
forest.fit(X_train, y_train)
#score = forest.score(X_test, y_test)
#print(f"Model Score: {score}")
joblib.dump(forest, "model.joblib")


