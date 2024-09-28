// API key and base URL for OpenWeatherMap
const apiKey = 'YOUR_API_KEY';  // Replace with your actual OpenWeatherMap API key
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Elements from the DOM
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weatherDesc');
const weatherIcon = document.getElementById('weatherIcon');
const errorMessage = document.getElementById('errorMessage');

// Event listener for search button click
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        showErrorMessage('Please enter a city name');
    }
});

// Function to fetch weather data from OpenWeatherMap API
function getWeather(city) {
    const apiUrl = `${apiBaseUrl}?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            showErrorMessage(error.message);
        });
}

// Function to display weather data in the DOM
function displayWeatherData(data) {
    weatherResult.style.display = 'block';
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = `Weather: ${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    errorMessage.textContent = '';  // Clear any previous error messages
}

// Function to show error messages
function showErrorMessage(message) {
    errorMessage.textContent = message;
    weatherResult.style.display = 'none';  // Hide weather result if there's an error
}
