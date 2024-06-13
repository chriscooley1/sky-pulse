"use strict";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch("https://api.weather.gov/gridpoints/SLC/20,19/forecast/hourly");
        const mydata = await response.json();
        const forecast = mydata.properties.periods;

        const currentWeather = forecast.filter((weather, index) => index === 0);
        const weatherAlert = forecast.filter((weather) => weather.shortForecast.toLowerCase().includes("alert") || weather.detailedForecast.toLowerCase().includes("alert"));
        const dailyWeather = forecast.slice(0, 24);

        const current = currentWeather.map((c) => c.name || `Current Temperature: ${c.temperature} ${c.temperatureUnit}`);
        const alert = weatherAlert.map((a) => `${a.startTime}: ${a.shortForecast}`);
        const daily = dailyWeather.map((d) => `Hour ${new Date(d.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}: ${d.temperature} ${d.temperatureUnit}`);

        const weatherLabels = dailyWeather.map(d => new Date(d.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        const weatherData = dailyWeather.map(d => d.temperature);

        const ctx = document.getElementById("myChart");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: weatherLabels,
                datasets: [{
                    label: "Temperature (°F)",
                    data: weatherData,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Temperature (°F)"
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Time"
                        }
                    }
                }
            }
        });

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
