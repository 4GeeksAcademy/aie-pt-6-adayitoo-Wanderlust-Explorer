/* ------------------------------------------------------------------ */
/*  src/hooks/useFilteredExperiences.ts – Encapsulated filter logic    */
/*  Receives search terms and the full array, returns filtered list.  */
/* ------------------------------------------------------------------ */

"use client";

import { useMemo } from "react";
import type { Experience } from "../types/index";

export interface FilterCriteria {
  search: string;
  category: string;
  destination: string;
}

/**
 * useFilteredExperiences – custom hook that filters an array of
 * experiences based on three optional criteria combined with AND logic.
 *
 * - `search`      → case-insensitive regex match on `title`
 * - `category`    → exact match on `category`
 * - `destination` → exact match on `location`
 *
 * Empty criteria are ignored.
 */
export function useFilteredExperiences(
  experiences: Experience[],
  criteria: FilterCriteria,
): Experience[] {
  const { search, category, destination } = criteria;

  return useMemo(() => {
    return experiences
      .filter((e) => e.isActive)
      .filter((e) => {
        if (search) {
          const regex = new RegExp(search, "i");
          if (!regex.test(e.title)) return false;
        }
        if (category && e.category !== category) return false;
        if (destination && e.location !== destination) return false;
        return true;
      })
      .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
  }, [experiences, search, category, destination]);
}

export default useFilteredExperiences;