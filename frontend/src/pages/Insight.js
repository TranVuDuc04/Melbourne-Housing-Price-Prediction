import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Insight = () => {
  const location = useLocation();
  const { postcode } = location.state || {};
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [loading, setLoading] = useState({ bar: true, line: true, pie: true });
  const [error, setError] = useState({ bar: null, line: null, pie: null });

  useEffect(() => {
    const fetchChartData = async () => {
      // Bar Chart for Incidents Recorded
      try {
        const barResponse = await axios.get(`http://localhost:8000/chart-data/bar?postcode=${postcode}`);
        setBarData({
          labels: barResponse.data.labels,
          datasets: [
            {
              label: `Incidents Recorded in Postcode ${postcode} Over Years`,
              data: barResponse.data.values,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        setError((prev) => ({ ...prev, bar: "Failed to load bar chart data" }));
      } finally {
        setLoading((prev) => ({ ...prev, bar: false }));
      }

      // Line Chart for House Prices with Dates
      try {
        const lineResponse = await axios.get(`http://localhost:8000/chart-data/line?postcode=${postcode}`);
        setLineData({
          labels: lineResponse.data.labels,
          datasets: [
            {
              label: `Average House Price in Postcode ${postcode} by Date (MM/YYYY)`,
              data: lineResponse.data.values,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
          ],
        });
      } catch (error) {
        setError((prev) => ({ ...prev, line: "Failed to load line chart data" }));
      } finally {
        setLoading((prev) => ({ ...prev, line: false }));
      }

      // Pie Chart for Property Distribution by Suburb
      try {
        const pieResponse = await axios.get("http://localhost:8000/chart-data/pie");
        setPieData({
          labels: pieResponse.data.labels,
          datasets: [
            {
              data: pieResponse.data.values,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
          ],
        });
      } catch (error) {
        setError((prev) => ({ ...prev, pie: "Failed to load pie chart data" }));
      } finally {
        setLoading((prev) => ({ ...prev, pie: false }));
      }
    };

    fetchChartData();
  }, [postcode]);

  return (
    <div>
      <h2>Insights</h2>

      {/* Bar Chart */}
      <div>
        {loading.bar ? (
          <p>Loading bar chart...</p>
        ) : error.bar ? (
          <p style={{ color: "red" }}>{error.bar}</p>
        ) : (
          barData && (
            <>
              <h3>Incidents Recorded Over Years (Bar Chart)</h3>
              <Bar data={barData} />
            </>
          )
        )}
      </div>

      {/* Line Chart */}
      <div>
        {loading.line ? (
          <p>Loading line chart...</p>
        ) : error.line ? (
          <p style={{ color: "red" }}>{error.line}</p>
        ) : (
          lineData && (
            <>
              <h3>Average House Price by Date (Line Chart)</h3>
              <Line data={lineData} />
            </>
          )
        )}
      </div>

      {/* Pie Chart */}
      <div>
        {loading.pie ? (
          <p>Loading pie chart...</p>
        ) : error.pie ? (
          <p style={{ color: "red" }}>{error.pie}</p>
        ) : (
          pieData && (
            <>
              <h3>Distribution of Properties by Suburb (Pie Chart)</h3>
              <Pie data={pieData} />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Insight;
