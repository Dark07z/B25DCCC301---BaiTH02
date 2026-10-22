import { useState, useCallback } from 'react';
import type { City, WeatherResponse, FetchStatus } from '../types';

export function useWeather() {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const fetchWeather = useCallback(async (city: City) => {
    setSelectedCity(city);
    setStatus('loading');
    setData(null);

    try {
      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${city.latitude}` +
        `&longitude=${city.longitude}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&timezone=Asia%2FHo_Chi_Minh` +
        `&forecast_days=7`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json: WeatherResponse = await res.json();
      setData(json);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, []);

  const retry = useCallback(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity, fetchWeather]);

  return { data, status, selectedCity, fetchWeather, retry };
}
