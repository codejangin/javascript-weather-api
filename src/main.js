"use strict";

window.addEventListener("load", () => {
  let long, lat;
  const temperatureCity = document.querySelector(".location-city");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const temperatureIcon = document.querySelector(".weather-icon");
  const temperatureSection = document.querySelector(".temperature-section");
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureSpan = document.querySelector(".temperature-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=26df8a148a96dc8a443f008d590b8aeb&units=imperial`;

      fetch(apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          document.querySelector(".loading").style.display = "none";

          const city = data.name;
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          const weatherIcon = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;
          let celsius = (temp - 32) * (5 / 9);

          temperatureCity.textContent = city;
          temperatureDegree.textContent = Math.floor(temp);
          temperatureSpan.textContent = "F";
          temperatureDescription.textContent =
            description.charAt(0).toUpperCase() + description.slice(1);
          temperatureIcon.innerHTML = weatherIcon;

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(temp);
            }
          });
        });
    });
  }
});
