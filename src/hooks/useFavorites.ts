import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'weather-app-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((cityName: string) => {
    setFavorites((prev) =>
      prev.includes(cityName)
        ? prev.filter((c) => c !== cityName)
        : [...prev, cityName]
    );
  }, []);

  const isFavorite = useCallback(
    (cityName: string) => favorites.includes(cityName),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
