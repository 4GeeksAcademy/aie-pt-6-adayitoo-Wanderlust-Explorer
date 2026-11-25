/* ------------------------------------------------------------------ */
/*  experiences/page.tsx – Browse experiences with URL-synced filters  */
/*  SearchBar + Filters sidebar + ExperienceCard grid + empty state.   */
/*                                                                     */
/*  Query params handled:  search, category, destination               */
/*  Filtering is derived from URL params directly (no useEffect).      */
/* ------------------------------------------------------------------ */

"use client";

import { useMemo } from "react";
import { experiences } from "../../lib/experiences";
import type { Experience } from "../../lib/types";
import ExperienceCard from "../../components/ExperienceCard";
import SearchBar from "../../components/SearchBar";
import Filters from "../../components/Filters";
import { useUrlFilters } from "../../hooks/useUrlFilters";
import { useFavoritesContext } from "../../components/FavoritesProvider";

/* ── Helpers ────────────────────────────────────────────────────── */

/**
 * Build a regex from a search term. Returns /\b(term)/i so that
 * "vela" matches "Sailing" (substring) case-insensitively.
 * The /i flag covers the requirement "regex case-insensitive sobre title".
 */
function buildSearchRegex(term: string): RegExp | null {
  const trimmed = term.trim();
  if (!trimmed) return null;
  return new RegExp(trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

/**
 * Filter the experience list based on URL params.
 * All active filters are combined with AND.
 */
function filterExperiences(
  list: Experience[],
  search: string,
  category: string,
  destination: string,
): Experience[] {
  const regex = buildSearchRegex(search);
  const cat = category.toLowerCase().trim();
  const dest = destination.trim();

  return list.filter((e) => {
    if (!e.isActive) return false;

    /* ── search: regex case-insensitive on title ───── */
    if (regex && !regex.test(e.title)) return false;

    /* ── category: exact match (lowercased values) ──── */
    if (cat && e.category !== cat) return false;

    /* ── destination: exact match on "Location, Country" ── */
    if (dest) {
      const expDest = `${e.location}, ${e.country}`;
      if (expDest !== dest) return false;
    }

    return true;
  });
}

/* ── Page component ─────────────────────────────────────────────── */
export default function ExperiencesPage() {
  const { getParam, setParams, isPending } = useUrlFilters();
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  /* ── Read current filter values from URL params ──────────────── */
  const searchParam = getParam("search") ?? "";
  const categoryParam = getParam("category") ?? "";
  const destinationParam = getParam("destination") ?? "";

  /* ── Derive filtered results directly from params (no useEffect) */
  const filtered = useMemo(
    () => filterExperiences(experiences, searchParam, categoryParam, destinationParam),
    [searchParam, categoryParam, destinationParam],
  );

  /* ── Handlers: write changes to URL via hook ──────────────────── */
  function onSearchDebounce(value: string): void {
    setParams({ search: value || null });
  }

  function onFiltersChange(overrides: Record<string, string | null | undefined>): void {
    setParams(overrides);
  }

  return (
    <div className="container" style={{ paddingTop: "1.25rem" }}>
      <h1 className="page-title">Explore Experiences</h1>
      <p className="page-subtitle">
        {filtered.length} experience{filtered.length === 1 ? "" : "s"} found
        {searchParam ? ` for "${searchParam}"` : ""}
      </p>

      {/* ── Search ──────────────────────────────────────────────── */}
      <SearchBar
        initialValue={searchParam}
        onDebounce={onSearchDebounce}
        isPending={isPending}
      />

      <div className="layout-with-sidebar" style={{ marginTop: "1.25rem" }}>
        {/* ── Sidebar filters ──────────────────────────────────── */}
        <aside className="layout-sidebar">
          <Filters
            getParam={getParam}
            setParams={(p) => onFiltersChange(p)}
            experiences={experiences}
          />
        </aside>

        {/* ── Results grid ────────────────────────────────────── */}
        <div className="layout-main">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">🔍</div>
              <h2 className="empty-state__title">No experiences found</h2>
              <p className="empty-state__text">
                Try adjusting your search term or selecting a different
                category or destination.
              </p>
            </div>
          ) : (
            <div className="experience-grid">
              {filtered.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  isFavorite={isFavorite(exp.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}