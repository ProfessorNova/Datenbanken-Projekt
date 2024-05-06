document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("weatherForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const city = document.getElementById("cityInput").value;
      // Make a GET request to your backend with the city name
      // Replace 'your_backend_url' with your actual backend endpoint
      fetch(`http://localhost:3000/weather/${city}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response data, update UI, etc.
          console.log(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    });
});
