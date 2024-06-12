"use strict";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch("https://api.weather.gov/gridpoints/SLC/20,19/forecast/hourly");
        const data = await response.json();
        const forecast = data.properties.periods;

        const currentWeather = forecast.filter((weather, index) => index === 0);
        const dailyWeather = forecast.slice(0, 24);

        const current = currentWeather.map((c) => c.name || `Current Temperature: ${c.temperature} ${c.temperatureUnit}`);
        const daily = dailyWeather.map((d) => `Hour ${d.startTime}: ${d.temperature} ${d.temperatureUnit}`);
            
        addWeather("current", current);
        addWeather("daily", daily);

    } catch (err) {
        document.getElementById("demo").innerHTML = err.name;
    }
});

const addWeather = (type, weatherData) => {
    for (let i = 0; i < weatherData.length; i++) {
        const weatherItem = document.createElement("li");
        weatherItem.innerHTML = weatherData[i];
        weatherItem.className = "dropdown-item";

        const dropdown = document.querySelector(`#${type} ul`);
        dropdown.appendChild(weatherItem);
    }
}
