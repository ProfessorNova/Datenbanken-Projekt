const express = require("express");
const app = express();
const cors = require("cors");
const { getConnection, sql } = require("./db");
const { fetchWeatherDataFromWeatherAPI } = require("./weatherAPI");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

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
      const lastUpdated = new Date(data.ObservationTime);
      const tenMinutesAgo = new Date(new Date() - 10 * 60000);

      res.json(data);
      // if (lastUpdated < tenMinutesAgo) {
      //   // Data is older than 10 minutes, fetch new data
      //   const weatherData = await fetchWeatherDataFromWeatherAPI(city);
      //   // Optionally update or insert this new data into the database
      //   await pool
      //     .request()
      //     .input("City", sql.VarChar, weatherData.city)
      //     .input("Temperature", sql.Float, weatherData.temperature_c)
      //     .input("Humidity", sql.Int, weatherData.humidity)
      //     .input("WindSpeed", sql.Float, weatherData.wind_kph)
      //     .input(
      //       "ObservationTime",
      //       sql.DateTime,
      //       new Date(weatherData.observationTime)
      //     )
      //     .execute("Wieland_sp_InsertWeatherData");

      //   res.json(weatherData);
      // } else {
      //   // Data is within 10 minutes, return existing data
      //   res.json(data);
      // }
    } else {
      // No data found in database, fetch from WeatherAPI
      const weatherData = await fetchWeatherDataFromWeatherAPI(city);
      // Insert this new data into the database
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
        .execute("Wieland_sp_InsertWeatherData");

      res.json(weatherData);
    }
  } catch (err) {
    console.error("Failed to retrieve weather data:", err);
    res.status(500).send("Failed to retrieve weather data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
