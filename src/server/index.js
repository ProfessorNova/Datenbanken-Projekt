const express = require("express");
const app = express();
const cors = require("cors");
const { getConnection, sql, getWeatherReport } = require("./db");
const { fetchWeatherDataFromWeatherAPI } = require("./weatherAPI");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

// Test endpoint to check if querying the database works
app.get("/testdb", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT 1 AS number");
    res.json(result.recordset);
  } catch (err) {
    console.error("Failed to query the database!", err);
    res.status(500).send("Failed to query the database");
  }
});

// Endpoint to retrieve weather data for a city
app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("City", sql.VarChar, city)
      .execute("Wieland_sp_GetLatestWeather");

    if (result.recordset.length > 0) {
      const data = result.recordset[0];
      const lastUpdatedUtc = new Date(data.ObservationTime); // Database stores in UTC
      const currentTimeUtc = new Date(); // Current UTC time
      const fifteenMinutesAgo = new Date(currentTimeUtc.getTime() - 15 * 60000);

      if (lastUpdatedUtc < fifteenMinutesAgo) {
        // Data is older than 15 minutes, fetch new data
        const weatherData = await fetchWeatherDataFromWeatherAPI(city);
        await pool
          .request()
          .input("City", sql.VarChar, weatherData.city)
          .input("Temperature", sql.Float, weatherData.temperature_c)
          .input("Humidity", sql.Int, weatherData.humidity)
          .input("WindSpeed", sql.Float, weatherData.wind_kph)
          .input(
            "ObservationTime",
            sql.DateTime,
            new Date(weatherData.observationTime)
          )
          .input("Condition", sql.VarChar, weatherData.condition_text)
          .execute("Wieland_sp_InsertWeatherData");

        // Retrieve newly inserted data
        const updatedResult = await pool
          .request()
          .input("City", sql.VarChar, city)
          .execute("Wieland_sp_GetLatestWeather");
        const updatedData = updatedResult.recordset[0];

        res.json(updatedData);
      } else {
        // Data is within 10 minutes, return existing data
        res.json(data);
      }
    } else {
      // No data found in database, fetch from WeatherAPI
      const weatherData = await fetchWeatherDataFromWeatherAPI(city);
      await pool
        .request()
        .input("City", sql.VarChar, weatherData.city)
        .input("Temperature", sql.Float, weatherData.temperature_c)
        .input("Humidity", sql.Int, weatherData.humidity)
        .input("WindSpeed", sql.Float, weatherData.wind_kph)
        .input(
          "ObservationTime",
          sql.DateTime,
          new Date(weatherData.observationTime)
        )
        .input("Condition", sql.VarChar, weatherData.condition_text)
        .execute("Wieland_sp_InsertWeatherData");

      // Retrieve newly inserted data
      const updatedResult = await pool
        .request()
        .input("City", sql.VarChar, city)
        .execute("Wieland_sp_GetLatestWeather");
      const updatedData = updatedResult.recordset[0];

      res.json(updatedData);
    }
  } catch (err) {
    console.error("Failed to retrieve weather data:", err);
    res.status(500).send("Failed to retrieve weather data");
  }
});

// Endpoint to retrieve weather report for a city
app.get("/weather-report/:city", async (req, res) => {
  try {
    const city = req.params.city;
    // Get weather report for the entire year of 2024
    // This is just a placeholder, you can change the dates as needed
    const fromDate = "2024-01-01";
    const toDate = "2025-01-01";
    const result = await getWeatherReport(city, fromDate, toDate);
    res.json(result);
  } catch (err) {
    console.error("Failed to retrieve weather report:", err);
    res.status(500).send("Failed to retrieve weather report");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
