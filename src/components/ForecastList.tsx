import type { DailyForecast, TemperatureUnit } from '../types';
import { convertTemp, formatDate } from '../utils/weather';
import './ForecastList.css';

interface ForecastListProps {
  daily: DailyForecast;
  unit: TemperatureUnit;
}

function ForecastList({ daily, unit }: ForecastListProps) {
  return (
    <div className="forecast">
      <h3 className="forecast__title">Dự báo 7 ngày</h3>
      <div className="forecast__scroll">
        {daily.time.map((date, i) => {
          const { dayName, dateFormatted } = formatDate(date);

          return (
            <div key={date} className="forecast__card">
              <span className="forecast__day-name">{dayName}</span>
              <span className="forecast__date">{dateFormatted}</span>
              <div className="forecast__temps">
                <span className="forecast__temp-max">
                  {convertTemp(daily.temperature_2m_max[i], unit)}
                </span>
                <span className="forecast__temp-min">
                  {convertTemp(daily.temperature_2m_min[i], unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastList;
