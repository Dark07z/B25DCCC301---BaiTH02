export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  weather_code: number;
  surface_pressure: number;
  uv_index: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyForecast;
}

export type TemperatureUnit = 'C' | 'F';

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';
