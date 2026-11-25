/* ------------------------------------------------------------------ */
/*  src/app/favorites/page.tsx – Favorites page                     */
/*  Client Component. Muestra solo experiencias favoritas.          */
/* ------------------------------------------------------------------ */

"use client";

import { experiences } from "../../data/experiences";
import { useFavoritesContext } from "../../components/FavoritesProvider";
import ExperienceCard from "../../components/ExperienceCard";

/**
 * FavoritesPage – shows the user's saved experiences.
 * If none are saved, shows an empty state with a CTA to explore.
 */
export default function FavoritesPage() {
  const { favorites } = useFavoritesContext();
  const favoriteIds = new Set(favorites.map((f) => f.experienceId));

  const favoriteExperiences = experiences.filter(
    (e) => e.isActive && favoriteIds.has(e.id),
  );

  /* ── Empty state ───────────────────────────────────────────── */
  if (favoriteExperiences.length === 0) {
    return (
      <section className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">💔</div>
        <h1 className="text-3xl font-bold text-gray-900">No favorites yet</h1>
        <p className="mt-4 text-lg text-gray-500 max-w-md mx-auto">
          You have not saved any experiences yet. Start exploring and
          tap the heart icon to save your favourites.
        </p>
        <a
          href="/experiences"
          className="mt-8 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md"
        >
          Explore Experiences
          <span className="text-xl">&rarr;</span>
        </a>
      </section>
    );
  }

  /* ── Favorite experiences grid ──────────────────────────────── */
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Your Favorites
        </h1>
        <p className="mt-2 text-gray-500">
          You have {favoriteExperiences.length} saved experience
          {favoriteExperiences.length === 1 ? "" : "s"}.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favoriteExperiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}
