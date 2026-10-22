import { useState } from 'react';
import CitySearch from './components/CitySearch';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import WeatherWidget from './components/WeatherWidget';
import ForecastList from './components/ForecastList';
import StatusMessage from './components/StatusMessage';
import UnitToggle from './components/UnitToggle';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
import { getWeatherInfo, getWindDirection, getUVLevel } from './utils/weather';
import type { TemperatureUnit } from './types';
import './App.css';

function App() {
  const [unit, setUnit] = useState<TemperatureUnit>('C');
  const { data, status, selectedCity, fetchWeather, retry } = useWeather();
  const { isFavorite, toggleFavorite } = useFavorites();

  const toggleUnit = () => setUnit((prev) => (prev === 'C' ? 'F' : 'C'));

  const bgClass =
    status === 'success' && data
      ? getWeatherInfo(data.current.weather_code).bgClass
      : 'bg-default';

  return (
    <div className={`app ${bgClass}`}>
      <header className="topbar">
        <h1 className="topbar__title">Thời Tiết</h1>
        <div className="topbar__actions">
          <CitySearch
            selectedCity={selectedCity}
            onSelectCity={fetchWeather}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
          <UnitToggle unit={unit} onToggle={toggleUnit} />
        </div>
      </header>

      <main className="dashboard">
        {(status === 'idle' || status === 'loading' || status === 'error') && (
          <div className="dashboard__status">
            {status === 'idle' && <StatusMessage type="idle" />}
            {status === 'loading' && <StatusMessage type="loading" />}
            {status === 'error' && <StatusMessage type="error" onRetry={retry} />}
          </div>
        )}

        {status === 'success' && data && selectedCity && (
          <div className="bento-grid">
            <CurrentWeatherCard
              current={data.current}
              cityName={selectedCity.name}
              unit={unit}
            />

            <WeatherWidget
              label="Độ ẩm"
              value={`${data.current.relative_humidity_2m}%`}
              subtitle={
                data.current.relative_humidity_2m > 70
                  ? 'Độ ẩm cao'
                  : data.current.relative_humidity_2m < 40
                    ? 'Độ ẩm thấp'
                    : 'Thoải mái'
              }
            />

            <WeatherWidget
              label="Gió"
              value={`${data.current.wind_speed_10m} km/h`}
              subtitle={`Hướng ${getWindDirection(data.current.wind_direction_10m)}`}
            />

            <WeatherWidget
              label="Chỉ số UV"
              value={data.current.uv_index.toFixed(1)}
              subtitle={getUVLevel(data.current.uv_index).label}
              accentColor={getUVLevel(data.current.uv_index).color}
            />

            <WeatherWidget
              label="Áp suất"
              value={`${Math.round(data.current.surface_pressure)} hPa`}
              subtitle={
                data.current.surface_pressure > 1020
                  ? 'Áp suất cao'
                  : data.current.surface_pressure < 1000
                    ? 'Áp suất thấp'
                    : 'Bình thường'
              }
            />

            <ForecastList daily={data.daily} unit={unit} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
