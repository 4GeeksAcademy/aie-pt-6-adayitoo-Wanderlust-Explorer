/* ------------------------------------------------------------------ */
/*  favorites/page.tsx – Display the user's saved experiences          */
/* ------------------------------------------------------------------ */

"use client";

import { experiences } from "../../lib/experiences";
import ExperienceCard from "../../components/ExperienceCard";
import { useFavoritesContext } from "../../components/FavoritesProvider";

/**
 * Favorites page — lists all experiences the user has hearted.
 * They can remove items from here as well.
 */
export default function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite, clearFavorites, favoriteCount } =
    useFavoritesContext();

  /* ── Look up full Experience objects ───────────────────────── */
  const favoriteExperiences = favorites
    .map((fav) => experiences.find((e) => e.id === fav.experienceId))
    .filter((e) => e !== undefined);

  return (
    <div className="container" style={{ paddingTop: "1.25rem" }}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="favorites-header">
        <div>
          <h1 className="page-title">
            ❤️ Your Favorites
          </h1>
          <p className="page-subtitle">
            {favoriteCount === 0
              ? "You haven't saved any experiences yet."
              : `You have ${favoriteCount} saved experience${favoriteCount === 1 ? "" : "s"}.`}
          </p>
        </div>
        {favoriteCount > 0 && (
          <button
            className="favorites-clear-btn"
            onClick={() => {
              if (confirm("Remove all favorites?")) {
                clearFavorites();
              }
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      {favoriteExperiences.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">💔</div>
          <h2 className="empty-state__title">Nothing here yet</h2>
          <p className="empty-state__text">
            Browse experiences and tap the heart icon to save your favourites.
          </p>
          <a
            href="/experiences"
            className="home-hero__cta"
            style={{ marginTop: "1rem", display: "inline-block" }}
          >
            Discover Experiences
          </a>
        </div>
      ) : (
        <div className="experience-grid">
          {favoriteExperiences.map((exp) => (
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
  );
}