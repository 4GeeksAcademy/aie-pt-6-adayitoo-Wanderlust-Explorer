/* ------------------------------------------------------------------ */
/*  FavoritesProvider.tsx – React context provider that wraps the      */
/*  favorites hook and makes it available to child components via      */
/*  props or a global store (e.g. React context / Zustand pattern).    */
/*                                                                     */
/*  This file shows the FavoritesProvider pattern using React's built‑ */
/*  in Context API. You can also use Zustand or a simple singleton.    */
/* ------------------------------------------------------------------ */

"use client";

import React, { createContext, useContext } from "react";
import { useFavorites, type UseFavoritesReturn } from "../hooks/useFavorites";

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const FavoritesContext = createContext<UseFavoritesReturn | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider component – wrap your app/page with this                  */
/* ------------------------------------------------------------------ */

interface FavoritesProviderProps {
  children: React.ReactNode;
}

/**
 * FavoritesProvider wraps an app section and provides the favorites
 * state to all descendant components via `useFavoritesContext()`.
 *
 * Usage:
 *
 *   <FavoritesProvider>
 *     <main>…your components (can call useFavoritesContext())…</main>
 *   </FavoritesProvider>
 */
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const favoritesState = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesState}>
      {children}
    </FavoritesContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Context consumer helper                                           */
/* ------------------------------------------------------------------ */

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