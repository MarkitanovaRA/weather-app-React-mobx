// Weather.js
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { weatherStore } from './WeatherStore'; 
import './Weather.css';

const Weather = observer(() => {
  useEffect(() => {
    weatherStore.fetchWeather();
  }, []);

  const handleCityChange = (event) => {
    weatherStore.setCity(event.target.value);
  };

  return (
    <div>
      <h1>Погода в городе {weatherStore.city}</h1>
      <input type="text" value={weatherStore.city} onChange={handleCityChange} />
      {weatherStore.loading && <p className="loading">Загрузка...</p>}
      {weatherStore.error && <p className="error">Ошибка: {weatherStore.error}</p>}
      {weatherStore.weatherData && (
        <div className="weather-info">
          <h2>{weatherStore.weatherData.location.name}</h2>
          <p>Температура: {weatherStore.weatherData.current.temp_c} °C</p>
          <p>Состояние: {weatherStore.weatherData.current.condition.text}</p>
          <h3>Прогноз на следующие 3 дня:</h3>
          {weatherStore.weatherData.forecast.forecastday.map((day) => (
            <div key={day.date}>
              <h4>{day.date}</h4>
              <p>Температура: {day.day.avgtemp_c} °C</p>
              <p>Состояние: {day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Weather;
