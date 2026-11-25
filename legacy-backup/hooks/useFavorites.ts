/* ------------------------------------------------------------------ */
/*  useFavorites.ts – Hook for managing favorites (wishlist) state    */
/* ------------------------------------------------------------------ */

import { useState, useCallback } from "react";
import type { FavoriteItem } from "../lib/types";

const STORAGE_KEY = "wanderlust_favorites";

/** Load favorites from localStorage (JSON) */
function loadFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

/** Persist favorites to localStorage */
function saveFavorites(items: FavoriteItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/* ------------------------------------------------------------------ */
/*  Return type for the hook                                          */
/* ------------------------------------------------------------------ */
export interface UseFavoritesReturn {
  favorites: FavoriteItem[];
  isFavorite: (experienceId: string) => boolean;
  toggleFavorite: (experienceId: string) => void;
  addFavorite: (experienceId: string) => void;
  removeFavorite: (experienceId: string) => void;
  clearFavorites: () => void;
  favoriteCount: number;
}

/**
 * useFavorites – React hook to read/write the user's wishlist.
 *
 * Usage:
 *   const { favorites, isFavorite, toggleFavorite } = useFavorites();
 */
export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavoritesState] = useState<FavoriteItem[]>(loadFavorites);

  /** Persist state both in memory and localStorage */
  const persist = useCallback((items: FavoriteItem[]) => {
    setFavoritesState(items);
    saveFavorites(items);
  }, []);

  /** Check if an experience is already favourited */
  const isFavorite = useCallback(
    (experienceId: string): boolean => {
      return favorites.some((f) => f.experienceId === experienceId);
    },
    [favorites],
  );

  /** Toggle: add if absent, remove if present */
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

  /** Add a single experience to favorites */
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

  /** Remove a single experience from favorites */
  const removeFavorite = useCallback(
    (experienceId: string): void => {
      persist(favorites.filter((f) => f.experienceId !== experienceId));
    },
    [favorites],
  );

  /** Remove all favorites */
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