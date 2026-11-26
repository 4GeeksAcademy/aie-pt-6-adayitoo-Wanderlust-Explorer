/* ------------------------------------------------------------------ */
/*  src/app/experiences/page.tsx – Explorer page with URL-driven       */
/*  search & filters (category, destination).                          */
/*  Client Component — URL query params are the single source of truth. */
/* ------------------------------------------------------------------ */

"use client";

import { useMemo } from "react";
import { experiences } from "../../data/experiences";
import ExperienceCard from "../../components/ExperienceCard";
import SearchBar from "../../components/SearchBar";
import FilterBar from "../../components/FilterBar";
import { useUrlFilters } from "../../hooks/useUrlFilters";
import { useFilteredExperiences } from "../../hooks/useFilteredExperiences";

/**
 * ExplorerPage – renders search bar, filter bar, and a responsive grid
 * of experience cards. All filter state lives in the URL query string.
 */
export default function ExplorerPage() {
  const { filters, setFilters } = useUrlFilters();

  /* ── Unique destinations ────────────────────────────────── */
  const destinations = useMemo(
    () => Array.from(new Set(experiences.map((e) => e.location))).sort(),
    [],
  );

  /* ── Filtered results (encapsulated in custom hook) ──────── */
  const filteredExperiences = useFilteredExperiences(experiences, filters);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Title ──────────────────────────────────────────── */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Explore Experiences
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          Browse our curated collection of {experiences.length} travel experiences
          from across the globe.
        </p>
      </div>

      {/* ── Search bar + FilterBar (responsive row) ────────── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SearchBar
          initialValue={filters.search}
          onSearch={(term) => setFilters({ search: term })}
        />
        <FilterBar
          initialCategory={filters.category}
          initialDestination={filters.destination}
          destinations={destinations}
          onCategoryChange={(value) => setFilters({ category: value })}
          onDestinationChange={(value) => setFilters({ destination: value })}
        />
      </div>

      {/* ── Results count ──────────────────────────────────── */}
      <p className="mb-4 text-sm text-gray-400">
        {filteredExperiences.length} experience
        {filteredExperiences.length !== 1 ? "s" : ""} found
      </p>

      {/* ── Grid or empty state ────────────────────────────── */}
      {filteredExperiences.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-7xl mb-6 text-gray-300">🔍</div>
          <p className="text-2xl font-semibold text-gray-700">
            No se encontraron resultados
          </p>
          <p className="mt-2 text-sm text-gray-400 max-w-sm">
            Intenta ajustar los criterios de búsqueda o los filtros aplicados.
          </p>
          {(filters.search || filters.category || filters.destination) && (
            <button
              onClick={() => setFilters({ search: "", category: "", destination: "" })}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              ✕ Limpiar filtros
            </button>
          )}
        </div>
      )}
    </section>
  );
}
