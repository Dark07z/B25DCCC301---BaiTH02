import type { TemperatureUnit } from '../types';
import './UnitToggle.css';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <button className="unit-toggle" onClick={onToggle}>
      <span className={`unit-toggle__option ${unit === 'C' ? 'unit-toggle__option--active' : ''}`}>
        °C
      </span>
      <span className="unit-toggle__separator">/</span>
      <span className={`unit-toggle__option ${unit === 'F' ? 'unit-toggle__option--active' : ''}`}>
        °F
      </span>
    </button>
  );
}

export default UnitToggle;
