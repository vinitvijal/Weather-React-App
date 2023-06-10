import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = '0c42f7f6b53b244c78a418f4f181282a';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`${API_URL}&q=${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className='main'>
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default App;
