import './WeatherWidget.css';

interface WeatherWidgetProps {
  label: string;
  value: string;
  subtitle?: string;
  accentColor?: string;
}

function WeatherWidget({ label, value, subtitle, accentColor }: WeatherWidgetProps) {
  return (
    <div className="weather-widget">
      <div className="weather-widget__header">
        <span className="weather-widget__label">{label}</span>
      </div>
      <div className="weather-widget__value" style={accentColor ? { color: accentColor } : undefined}>
        {value}
      </div>
      {subtitle && (
        <div className="weather-widget__subtitle">{subtitle}</div>
      )}
    </div>
  );
}

export default WeatherWidget;
