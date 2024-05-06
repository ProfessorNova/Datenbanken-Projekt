// global variable which stores which city is currently being displayed
window.currentCity = "London";

function getWeatherData(city) {
  // Make a GET request to backend with the city name
  fetch(`http://localhost:3000/weather/${encodeURIComponent(city)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.currentCity = city;
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function displayWeatherData(data) {
  const cityDisplay = document.getElementById("cityDisplay");
  const temperatureDisplay = document.getElementById("temperatureDisplay");
  const humidityDisplay = document.getElementById("humidityDisplay");
  const observationTimeDisplay = document.getElementById(
    "observationTimeDisplay"
  );
  const windSpeedDisplay = document.getElementById("windSpeedDisplay");
  const conditionDisplay = document.getElementById("conditionDisplay");

  cityDisplay.textContent = data.City;
  temperatureDisplay.textContent = `${data.Temperature}°C`;
  humidityDisplay.textContent = `${data.Humidity}%`;
  windSpeedDisplay.textContent = `${data.WindSpeed} km/h`;
  conditionDisplay.textContent = data.Condition;
  // Format the observation time
  const observationTime = new Date(data.ObservationTime);
  const formattedObservationTime = observationTime.toLocaleString();
  observationTimeDisplay.textContent = formattedObservationTime;
}

function getWeatherReport() {
  // Make a GET request to backend with the city name
  fetch(
    `http://localhost:3000/weather-report/${encodeURIComponent(
      window.currentCity
    )}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayWeatherReport(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function displayWeatherReport(data) {
  const avgTemperatureDisplay = document.getElementById("avgTemp");
  const minTemperatureDisplay = document.getElementById("minTemp");
  const maxTemperatureDisplay = document.getElementById("maxTemp");
  const avgHumidityDisplay = document.getElementById("avgHumid");
  const minHumidityDisplay = document.getElementById("minHumid");
  const maxHumidityDisplay = document.getElementById("maxHumid");
  const avgWindSpeedDisplay = document.getElementById("avgWindSpeed");
  const minWindSpeedDisplay = document.getElementById("minWindSpeed");
  const maxWindSpeedDisplay = document.getElementById("maxWindSpeed");

  avgTemperatureDisplay.textContent = `${data.AvgTemperature.toFixed(2)}°C`;
  minTemperatureDisplay.textContent = `${data.MinTemperature.toFixed(2)}°C`;
  maxTemperatureDisplay.textContent = `${data.MaxTemperature.toFixed(2)}°C`;
  avgHumidityDisplay.textContent = `${data.AvgHumidity.toFixed(2)}%`;
  minHumidityDisplay.textContent = `${data.MinHumidity.toFixed(2)}%`;
  maxHumidityDisplay.textContent = `${data.MaxHumidity.toFixed(2)}%`;
  avgWindSpeedDisplay.textContent = `${data.AvgWindSpeed.toFixed(2)} km/h`;
  minWindSpeedDisplay.textContent = `${data.MinWindSpeed.toFixed(2)} km/h`;
  maxWindSpeedDisplay.textContent = `${data.MaxWindSpeed.toFixed(2)} km/h`;
}

document.addEventListener("DOMContentLoaded", function () {
  getWeatherData(window.currentCity);
  document
    .getElementById("weatherForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const city = document.getElementById("cityInput").value;
      getWeatherData(city);
    });
});
