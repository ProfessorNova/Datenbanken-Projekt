const axios = require("axios");
const moment = require("moment-timezone");

function convertToLocalTimeAndThenToUTC(localTime, timeZone) {
  // Convert the local time to a moment object in the given time zone
  const timeInLocal = moment.tz(localTime, timeZone);
  // Convert the time to UTC
  const timeInUTC = timeInLocal.utc();
  return timeInUTC.format(); // Returns the UTC time in ISO8601 string format
}

async function fetchWeatherDataFromWeatherAPI(city) {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return {
      city: data.location.name,
      temperature_c: data.current.temp_c,
      wind_kph: data.current.wind_kph,
      humidity: data.current.humidity,
      condition_text: data.current.condition.text,
      observationTime: convertToLocalTimeAndThenToUTC(
        data.current.last_updated,
        data.location.tz_id
      ),
    };
  } catch (error) {
    console.error("Error fetching weather data from WeatherAPI:", error);
    throw error;
  }
}

module.exports = {
  fetchWeatherDataFromWeatherAPI,
};
