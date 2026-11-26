/* ------------------------------------------------------------------ */
/*  src/components/FavoritesProvider.tsx – Favorites context            */
/*  Shared state across pages using React Context + useState.          */
/* ------------------------------------------------------------------ */

"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/**
 * FavoritesProvider – wraps the app and shares the favorites state
 * (array of experience IDs) via context.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    );
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook to consume the favorites context.
 */
export function useFavoritesContext(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavoritesContext must be used within a <FavoritesProvider>");
  }
  return ctx;
}

export default FavoritesProvider;