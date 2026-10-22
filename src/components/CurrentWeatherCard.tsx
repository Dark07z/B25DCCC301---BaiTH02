import type { CurrentWeather, TemperatureUnit } from '../types';
import { getWeatherInfo, convertTemp, formatTime } from '../utils/weather';
import './CurrentWeatherCard.css';

interface CurrentWeatherCardProps {
  current: CurrentWeather;
  cityName: string;
  unit: TemperatureUnit;
}

function CurrentWeatherCard({ current, cityName, unit }: CurrentWeatherCardProps) {
  const info = getWeatherInfo(current.weather_code);

  return (
    <div className="hero-card">
      <div className="hero-card__top">
        <div className="hero-card__location">
          <h2 className="hero-card__city">{cityName}</h2>
        </div>
        <p className="hero-card__updated">
          {formatTime(current.time)}
        </p>
      </div>

      <div className="hero-card__body">
        <div className="hero-card__info">
          <span className="hero-card__temp">
            {convertTemp(current.temperature_2m, unit)}
          </span>
          <p className="hero-card__desc">{info.description}</p>
          <p className="hero-card__feels">
            Cảm giác như {convertTemp(current.apparent_temperature, unit)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
