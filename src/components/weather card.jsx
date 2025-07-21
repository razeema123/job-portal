import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherCard.css"; // Style defined below

function WeatherCard() {
  const [weather, setWeather] = useState(null);

  const city = "Chennai"; // change as needed
  const apiKey = "YOUR_API_KEY"; // replace with your API key

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then((res) => {
        setWeather(res.data);
      })
      .catch((err) => console.error("Weather fetch error:", err));
  }, []);

  return (
    <div className="weather-card">
      {weather ? (
        <>
          <h3>{weather.name}</h3>
          <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          <p className="condition">{weather.weather[0].main}</p>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}

export default WeatherCard;
