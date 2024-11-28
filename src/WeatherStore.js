// WeatherStore.js
import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const apiKey = 'fa5e5aca82b74db49c1162522242909';

class WeatherStore {
  weatherData = null;
  loading = false;
  error = null;
  city = 'Москва';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchWeather() {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${this.city}&days=3&aqi=no&alerts=no`
      );
      this.weatherData = response.data;
    } catch (error) {
      this.error = error.response
        ? `Ошибка ${error.response.status}: ${error.response.data.error.message}`
        : error.message;
    } finally {
      this.loading = false;
    }
  }

  setCity(newCity) {
    this.city = newCity;
    this.fetchWeather(); 
  }
}

export const weatherStore = new WeatherStore();
