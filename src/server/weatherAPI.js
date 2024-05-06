const axios = require("axios");

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
      region: data.location.region,
      country: data.location.country,
      temperature_c: data.current.temp_c,
      wind_kph: data.current.wind_kph,
      humidity: data.current.humidity,
      condition_text: data.current.condition.text,
      condition_icon: `https:${data.current.condition.icon}`,
      observationTime: data.current.last_updated,
    };
  } catch (error) {
    console.error("Error fetching weather data from WeatherAPI:", error);
    throw error;
  }
}

module.exports = {
  fetchWeatherDataFromWeatherAPI,
};
