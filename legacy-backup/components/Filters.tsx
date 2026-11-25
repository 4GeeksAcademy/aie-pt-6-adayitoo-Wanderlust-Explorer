/* ------------------------------------------------------------------ */
/*  Filters.tsx – Category & destination select controls that read/    */
/*  write URL search params via the useUrlFilters hook.                */
/* ------------------------------------------------------------------ */

"use client";

import type { Category } from "../lib/types";
import type { Experience } from "../lib/types";

interface FiltersProps {
  getParam: (key: string) => string | null;
  setParams: (params: Record<string, string | null | undefined>) => void;
  experiences: Experience[];
}

/* ── Category options (lowercase keys for URL, titlecase for display) */
const CATEGORY_OPTIONS: { value: Category | ""; label: string }[] = [
  { value: "", label: "All Categories" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "food", label: "Food" },
  { value: "nature", label: "Nature" },
  { value: "wellness", label: "Wellness" },
];

/**
 * Derive unique destination strings from the dataset.
 * Uses the format "Location, Country" seen on the cards.
 */
function buildDestinations(expList: Experience[]): string[] {
  const set = new Set<string>();
  for (const e of expList) {
    if (e.isActive) {
      set.add(`${e.location}, ${e.country}`);
    }
  }
  return Array.from(set).sort();
}

/**
 * Filters – Two dropdowns (category & destination) that read from
 * URL params on mount and write to them via setParams on change.
 */
export function Filters({
  getParam,
  setParams,
  experiences: expList,
}: FiltersProps) {
  const destinations = buildDestinations(expList);
  const currentCategory = getParam("category") ?? "";
  const currentDestination = getParam("destination") ?? "";

  function handleCategoryChange(raw: string): void {
    setParams({ category: raw || null });
  }

  function handleDestinationChange(raw: string): void {
    setParams({ destination: raw || null });
  }

  return (
    <aside className="filters">
      <h3 className="filters__title">Filters</h3>

      {/* ── Category ──────────────────────────────────────────── */}
      <div className="filters__group">
        <label className="filters__label" htmlFor="filter-category">
          Category
        </label>
        <select
          id="filter-category"
          className="filters__select"
          value={currentCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Destination ────────────────────────────────────────── */}
      <div className="filters__group">
        <label className="filters__label" htmlFor="filter-destination">
          Destination
        </label>
        <select
          id="filter-destination"
          className="filters__select"
          value={currentDestination}
          onChange={(e) => handleDestinationChange(e.target.value)}
        >
          <option value="">All Destinations</option>
          {destinations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}