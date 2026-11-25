/* ------------------------------------------------------------------ */
/*  src/types/index.ts – Shared type definitions for Wanderlust       */
/* ------------------------------------------------------------------ */

/** The five experience categories */
export type Category =
  | "adventure"
  | "cultural"
  | "food"
  | "nature"
  | "wellness";

/** Difficulty / intensity level */
export type Difficulty = "easy" | "moderate" | "hard";

/** A single travel experience */
export interface Experience {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  duration: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  location: string;
  country: string;
  continent: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** A single item inside the favorites list */
export interface FavoriteItem {
  experienceId: string;
  addedAt: string;
}