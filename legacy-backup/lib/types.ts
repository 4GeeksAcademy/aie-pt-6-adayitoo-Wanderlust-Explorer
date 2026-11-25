/* ------------------------------------------------------------------ */
/*  types.ts – Shared type definitions for Wanderlust Explorer      */
/* ------------------------------------------------------------------ */

/** Categories an experience can belong to */
export type Category =
  | "adventure"
  | "cultural"
  | "food"
  | "nature"
  | "wellness";

/** Difficulty / intensity level */
export type Difficulty = "easy" | "moderate" | "hard";

/** A single travel experience / destination */
export interface Experience {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  duration: string;           // e.g. "3 days", "Full day"
  price: number;              // USD
  currency: string;           // "USD"
  rating: number;             // 1.0 – 5.0
  reviewCount: number;
  imageUrl: string;
  location: string;
  country: string;
  continent: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  createdAt: string;          // ISO 8601
  updatedAt: string;          // ISO 8601
}

/** Shape returned by the URL‑filter hook */
export interface ActiveFilters {
  query: string;
  category: Category | "all";
  difficulty: Difficulty | "all";
  continent: string;          // "" means "all"
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
}

export type SortOption =
  | "popularity"
  | "rating"
  | "price-asc"
  | "price-desc"
  | "newest";

/** A single item inside the favorites list */
export interface FavoriteItem {
  experienceId: string;
  addedAt: string;            // ISO 8601
}