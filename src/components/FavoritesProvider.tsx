/* ------------------------------------------------------------------ */
/*  src/components/FavoritesProvider.tsx – React Context provider      */
/*  for the favorites state. Wraps the app so any descendant can       */
/*  call useFavoritesContext().                                        */
/* ------------------------------------------------------------------ */

"use client";

import React, { createContext, useContext } from "react";
import { useFavorites, type UseFavoritesReturn } from "../hooks/useFavorites";

const FavoritesContext = createContext<UseFavoritesReturn | null>(null);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

/**
 * FavoritesProvider – wraps the app and provides favorites state
 * to all descendant components via `useFavoritesContext()`.
 */
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const favoritesState = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesState}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Consume the favorites context inside any child component.
 *
 * Usage:
 *   const { isFavorite, toggleFavorite, favoriteCount } = useFavoritesContext();
 */
export function useFavoritesContext(): UseFavoritesReturn {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error(
      "useFavoritesContext() called outside of a <FavoritesProvider> wrapper.",
    );
  }
  return ctx;
}

export default FavoritesProvider;