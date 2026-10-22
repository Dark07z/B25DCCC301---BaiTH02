import { useState } from 'react';
import type { City } from '../types';
import { CITIES } from '../utils/cities';
import { removeDiacritics } from '../utils/weather';
import './CityList.css';

interface CityListProps {
  selectedCity: City | null;
  onSelectCity: (city: City) => void;
  isFavorite: (name: string) => boolean;
  onToggleFavorite: (name: string) => void;
}

function CityList({ selectedCity, onSelectCity, isFavorite, onToggleFavorite }: CityListProps) {
  const [search, setSearch] = useState('');

  const filteredCities = CITIES.filter((city) => {
    if (!search.trim()) return true;
    const normalized = removeDiacritics(city.name);
    const query = removeDiacritics(search.trim());
    return normalized.includes(query);
  });

  const sortedCities = [...filteredCities].sort((a, b) => {
    const aFav = isFavorite(a.name) ? 0 : 1;
    const bFav = isFavorite(b.name) ? 0 : 1;
    return aFav - bFav;
  });

  return (
    <aside className="city-list">
      <h2 className="city-list__title">Thành phố</h2>

      <input
        type="text"
        className="city-list__search"
        placeholder="Tìm thành phố..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="city-list__items">
        {sortedCities.map((city) => (
          <li key={city.name} className="city-list__item-wrapper">
            <button
              className={`city-list__item ${
                selectedCity?.name === city.name ? 'city-list__item--active' : ''
              }`}
              onClick={() => onSelectCity(city)}
            >
              <span className="city-list__name">
                {isFavorite(city.name) && <span className="city-list__star">⭐</span>}
                {city.name}
              </span>
            </button>
            <button
              className="city-list__fav-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(city.name);
              }}
              title={isFavorite(city.name) ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
            >
              {isFavorite(city.name) ? '❤️' : '🤍'}
            </button>
          </li>
        ))}

        {sortedCities.length === 0 && (
          <li className="city-list__empty">Không tìm thấy thành phố</li>
        )}
      </ul>
    </aside>
  );
}

export default CityList;
