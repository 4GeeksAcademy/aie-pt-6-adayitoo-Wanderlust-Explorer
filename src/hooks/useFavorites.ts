/* ------------------------------------------------------------------ */
/*  src/hooks/useFavorites.ts – Hook for managing favorites state      */
/* ------------------------------------------------------------------ */

"use client";

import { useState, useCallback } from "react";
import type { FavoriteItem } from "../types/index";

const STORAGE_KEY = "wanderlust_favorites";

function loadFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

function saveFavorites(items: FavoriteItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export interface UseFavoritesReturn {
  favorites: FavoriteItem[];
  isFavorite: (experienceId: string) => boolean;
  toggleFavorite: (experienceId: string) => void;
  addFavorite: (experienceId: string) => void;
  removeFavorite: (experienceId: string) => void;
  clearFavorites: () => void;
  favoriteCount: number;
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavoritesState] = useState<FavoriteItem[]>(loadFavorites);

  const persist = useCallback((items: FavoriteItem[]) => {
    setFavoritesState(items);
    saveFavorites(items);
  }, []);

  const isFavorite = useCallback(
    (experienceId: string): boolean =>
      favorites.some((f) => f.experienceId === experienceId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (experienceId: string): void => {
      if (isFavorite(experienceId)) {
        removeFavorite(experienceId);
      } else {
        addFavorite(experienceId);
      }
    },
    [favorites, isFavorite],
  );

  const addFavorite = useCallback(
    (experienceId: string): void => {
      if (isFavorite(experienceId)) return;
      const newItem: FavoriteItem = {
        experienceId,
        addedAt: new Date().toISOString(),
      };
      persist([...favorites, newItem]);
    },
    [favorites, isFavorite],
  );

  const removeFavorite = useCallback(
    (experienceId: string): void => {
      persist(favorites.filter((f) => f.experienceId !== experienceId));
    },
    [favorites],
  );

  const clearFavorites = useCallback((): void => {
    persist([]);
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    get favoriteCount() {
      return favorites.length;
    },
  };
}