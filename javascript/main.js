"use strict"

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch("https://api.weather.gov/gridpoints/SLC/20,19/forecast/hourly");
        const mydata = await response.json();
        const forecast = mydata.properties.periods;

        const currentWeather = forecast.filter((weather, index) => index === 0);
        const weatherAlert = forecast.filter((weather) => 
            weather.shortForecast.toLowerCase().includes("alert") || 
            weather.detailedForecast.toLowerCase().includes("alert") ||
            weather.shortForecast.toLowerCase().includes("sunny") ||
            weather.detailedForecast.toLowerCase().includes("sunny") ||
            weather.shortForecast.toLowerCase().includes("rain") ||
            weather.detailedForecast.toLowerCase().includes("rain")
        ).slice(0, 1);

        const dailyWeather = forecast.slice(0, 24);

        const current = currentWeather.map((c) => c.name || `Current Temperature: ${c.temperature} ${c.temperatureUnit}`);
        const alert = weatherAlert.map((a) => a.shortForecast);
        const wind = currentWeather.map((w) => `Wind Speed: ${w.windSpeed}, Direction: ${w.windDirection}`);

        const weatherLabels = dailyWeather.map(d => new Date(d.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        const weatherData = dailyWeather.map(d => d.temperature);

        const ctx = document.getElementById("myChart").getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: weatherLabels,
                datasets: [{
                    label: "Temperature (°F)",
                    data: weatherData,
                    backgroundColor: weatherData.map(temp => {
                        if (temp <= 32) {
                            return "rgba(0, 0, 255, 0.6)"; // Blue for freezing temperatures
                        } else if (temp <= 65) {
                            return "rgba(0, 255, 255, 0.6)"; // Cyan for cold temperatures
                        } else if (temp <= 75) {
                            return "rgba(0, 255, 0, 0.6)"; // Green for temperatures between 65 and 75
                        } else if (temp <= 90) {
                            return "rgba(255, 255, 0, 0.6)"; // Yellow for temperatures between 75 and 90
                        } else {
                            return "rgba(255, 0, 0, 0.6)"; // Red for temperatures greater than 90
                        }
                    }),
                    borderColor: weatherData.map(temp => {
                        if (temp <= 32) {
                            return "rgba(0, 0, 255, 1)";
                        } else if (temp <= 65) {
                            return "rgba(0, 255, 255, 1)";
                        } else if (temp <= 75) {
                            return "rgba(0, 255, 0, 1)";
                        } else if (temp <= 90) {
                            return "rgba(255, 255, 0, 1)";
                        } else {
                            return "rgba(255, 0, 0, 1)";
                        }
                    }),
                    borderWidth: 1,
                    datalabels: {
                        anchor: "end",
                        align: "end",
                        offset: 4,
                        display: "auto",
                        color: "#fff"
                    }
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
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    datalabels: {
                        color: "#fff"
                    }
                }
            }
        });

        addWeatherToCard("current-weather-list", current);
        addWeatherToCard("weather-alerts-list", alert);
        addWeatherToCard("wind-speed-list", wind);

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
};
