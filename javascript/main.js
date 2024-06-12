"use strict";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch("https://api.weather.gov/gridpoints/SLC/20,19/forecast/hourly");
        const data = await response.json();
        const forecast = data.properties.periods;

        const currentWeather = forecast.filter((weather, index) => index === 0);
        const weatherAlert = forecast.filter((weather) => weather.type === "weather-alert");
        const dailyWeather = forecast.slice(0, 24);

        const current = currentWeather.map((c) => c.name || `Current Temperature: ${c.temperature} ${c.temperatureUnit}`);
        const alert = weatherAlert.map((a) => a.name);
        const daily = dailyWeather.map((d) => `Hour ${d.startTime}: ${d.temperature} ${d.temperatureUnit}`);

        document.getElementById("current-weather-btn").addEventListener("click", function(event) {
            event.preventDefault();
            addWeatherToCard("current-weather-list", current);
        });
        document.getElementById("weather-alerts-btn").addEventListener("click", function(event) {
            event.preventDefault();
            addWeatherToCard("weather-alerts-list", alert);
        });
        document.getElementById("daily-forecast-btn").addEventListener("click", function(event) {
            event.preventDefault();
            addWeatherToCard("daily-forecast-list", daily);
        });

    } catch (err) {
        document.getElementById("demo").innerHTML = err.name;
    }
});

const addWeatherToCard = (listId, weatherData) => {
    for (let i = 0; i < weatherData.length; i++) {
        const weatherItem = document.createElement("li");
        weatherItem.innerHTML = weatherData[i];
        weatherItem.className = "list-group-item";

        const list = document.getElementById(listId);
        list.appendChild(weatherItem);
    }
}