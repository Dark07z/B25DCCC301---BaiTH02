import { useState, useRef, useEffect } from 'react';
import type { City } from '../types';
import { CITIES } from '../utils/cities';
import { removeDiacritics } from '../utils/weather';
import './CitySearch.css';

interface CitySearchProps {
  selectedCity: City | null;
  onSelectCity: (city: City) => void;
  isFavorite: (name: string) => boolean;
  onToggleFavorite: (name: string) => void;
}

function CitySearch({ selectedCity, onSelectCity, isFavorite, onToggleFavorite }: CitySearchProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleSelect = (city: City) => {
    onSelectCity(city);
    setSearch('');
    setIsOpen(false);
  };

  return (
    <div className="city-search" ref={dropdownRef}>
      <div className="city-search__input-wrapper">
        <input
          type="text"
          className="city-search__input"
          placeholder={selectedCity ? selectedCity.name : 'Tìm thành phố...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        <button
          className="city-search__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle dropdown"
        >
          <span className={`city-search__arrow ${isOpen ? 'city-search__arrow--open' : ''}`}>▾</span>
        </button>
      </div>

      {isOpen && (
        <ul className="city-search__dropdown">
          {sortedCities.map((city) => (
            <li key={city.name} className="city-search__dropdown-item">
              <button
                className={`city-search__option ${
                  selectedCity?.name === city.name ? 'city-search__option--active' : ''
                }`}
                onClick={() => handleSelect(city)}
              >
                <span className="city-search__city-name">
                  {isFavorite(city.name) && <span className="city-search__star">⭐</span>}
                  {city.name}
                </span>
              </button>
              <button
                className="city-search__fav-btn"
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
            <li className="city-search__empty">Không tìm thấy thành phố</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default CitySearch;

