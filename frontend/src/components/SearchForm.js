import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    Distance: "",
    Landsize: "",
    Rooms: "",
    Bedroom2: "",
    Bathroom: "",
    Car: "",
    Postcode: "",
    YearBuilt: "",
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [incidents, setIncidents] = useState(null);
  const [serverStatus, setServerStatus] = useState("Checking...");

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await axios.get("http://localhost:8000/health");
        setServerStatus(response.data.status);
      } catch (error) {
        setServerStatus("Server is down");
        console.error("Error checking server health:", error);
      }
    };
    checkServerHealth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    setInputData({ ...inputData, [name]: value });

    // Real-time validation for negative numbers
    if (numericValue < 0) {
      setErrors({
        ...errors,
        [name]: `${name} must be a positive number.`,
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    // Fetch incidents data if postcode changes
    if (name === "Postcode" && value) {
      fetchIncidentsData(value);
    }
  };

  const fetchIncidentsData = async (postcode) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/incidents/${postcode}`
      );
      setIncidents(response.data.incidents);
    } catch (error) {
      console.error("Error fetching incidents data:", error);
      setIncidents(null);
    }
  };

  // Validate input data on form submission
  const validateInputs = () => {
    const newErrors = {};
    if (
      parseInt(inputData.Rooms) <
      parseInt(inputData.Bedroom2) + parseInt(inputData.Bathroom)
    ) {
      newErrors.Rooms =
        "Rooms must be equal to or greater than the sum of Bedrooms and Bathrooms.";
    }
    if (!(inputData.Postcode >= 3000 && inputData.Postcode <= 3207)) {
      newErrors.Postcode =
        "Please enter a valid Melbourne postcode (3000-3207).";
    }
    for (const key in inputData) {
      if (
        inputData.hasOwnProperty(key) &&
        !isNaN(inputData[key]) &&
        inputData[key] <= 0
      ) {
        newErrors[key] = `${key} must be a positive number.`;
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/predict", {
        Distance: parseFloat(inputData.Distance),
        Landsize: parseFloat(inputData.Landsize),
        Rooms: parseInt(inputData.Rooms),
        Bedroom2: parseInt(inputData.Bedroom2),
        Bathroom: parseInt(inputData.Bathroom),
        Car: parseInt(inputData.Car),
        Postcode: parseInt(inputData.Postcode),
        YearBuilt: parseInt(inputData.YearBuilt),
        IncidentsRecorded: incidents || 0,
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const handleInsightNavigation = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      navigate(`/insight`, { state: { postcode: inputData.Postcode } });
    }
  };

  return (
    <div className="search-form-container">
      <h1>Predict House Price</h1>
      <p>Server Status: {serverStatus}</p>
      <form className="search-form" onSubmit={handleSubmit}>
        <label>Distance from CBD (km):</label>
        <input
          type="number"
          name="Distance"
          value={inputData.Distance}
          onChange={handleChange}
          required
        />
        {errors.Distance && <p className="error">{errors.Distance}</p>}

        <label>Landsize:</label>
        <input
          type="number"
          name="Landsize"
          value={inputData.Landsize}
          onChange={handleChange}
          required
        />
        {errors.Landsize && <p className="error">{errors.Landsize}</p>}

        <label>Rooms:</label>
        <input
          type="number"
          name="Rooms"
          value={inputData.Rooms}
          onChange={handleChange}
          required
        />
        {errors.Rooms && <p className="error">{errors.Rooms}</p>}

        <label>Bedrooms:</label>
        <input
          type="number"
          name="Bedroom2"
          value={inputData.Bedroom2}
          onChange={handleChange}
          required
        />
        {errors.Bedroom2 && <p className="error">{errors.Bedroom2}</p>}

        <label>Bathrooms:</label>
        <input
          type="number"
          name="Bathroom"
          value={inputData.Bathroom}
          onChange={handleChange}
          required
        />
        {errors.Bathroom && <p className="error">{errors.Bathroom}</p>}

        <label>Car:</label>
        <input
          type="number"
          name="Car"
          value={inputData.Car}
          onChange={handleChange}
          required
        />
        {errors.Car && <p className="error">{errors.Car}</p>}

        <label>Postcode:</label>
        <div className="postcode-container">
          <input
            type="number"
            name="Postcode"
            value={inputData.Postcode}
            onChange={handleChange}
            required
          />
          {incidents !== null && (
            <span className="incidents-recorded">
              Incidents Recorded: {incidents}
            </span>
          )}
        </div>
        {errors.Postcode && <p className="error">{errors.Postcode}</p>}

        <label>Year Built:</label>
        <input
          type="number"
          name="YearBuilt"
          value={inputData.YearBuilt}
          onChange={handleChange}
          required
        />
        {errors.YearBuilt && <p className="error">{errors.YearBuilt}</p>}

        <button type="submit">Predict</button>
        <button onClick={handleInsightNavigation} className="insight-button">
          View Insights
        </button>
      </form>
      <br />
      {result && <h2>Predicted Price: ${result.toFixed(2)}</h2>}
    </div>
  );
}

export default SearchForm;
