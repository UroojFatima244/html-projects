const apiKey = '7852a3cc8c0d02917c00abb6cbb19d09'; 


const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherCard = document.getElementById("weather-card");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const errorMessage = document.getElementById("error-message");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const { name, sys, main, weather } = data;

    cityName.textContent = `${name}, ${sys.country}`;
    temperature.textContent = `🌡️ ${main.temp.toFixed(1)}°C`;
    description.textContent = `☁️ ${weather[0].description}`;
    humidity.textContent = `💧 Humidity: ${main.humidity}%`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherCard.classList.remove("hidden");
    errorMessage.classList.add("hidden");

  } catch (error) {
    errorMessage.classList.remove("hidden");
    weatherCard.classList.add("hidden");
  }
}
