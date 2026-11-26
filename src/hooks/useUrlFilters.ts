/* ------------------------------------------------------------------ */
/*  src/hooks/useUrlFilters.ts – Hook to read & write query params    */
/*  for the search, category, and destination filters.                */
/* ------------------------------------------------------------------ */

"use client";

import { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export interface UrlFilters {
  search: string;
  category: string;
  destination: string;
}

/**
 * useUrlFilters – custom hook that reads filter values from the URL
 * query string and provides a setter to update them via router.replace.
 *
 * Query params used:
 *   - `search`      → text search term
 *   - `category`    → experience category
 *   - `destination` → location name
 *
 * Usage:
 *   const { filters, setFilters } = useUrlFilters();
 */
export function useUrlFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  /** Read current filter values from URL query params */
  const filters: UrlFilters = {
    search: searchParams.get("search") ?? "",
    category: searchParams.get("category") ?? "",
    destination: searchParams.get("destination") ?? "",
  };

  /**
   * Update one or more filters in the URL.
   * Pass an object with only the keys you want to change.
   * Empty-string values are removed from the URL.
   */
  const setFilters = useCallback(
    (partial: Partial<UrlFilters>) => {
      const next = { ...filters, ...partial };
      const params = new URLSearchParams();

      Object.entries(next).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });

      const qs = params.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;

      router.replace(url, { scroll: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, router, searchParams],
  );

  return { filters, setFilters };
}

export default useUrlFilters;