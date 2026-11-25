/* ------------------------------------------------------------------ */
/*  profile/page.tsx – Simple user profile page                        */
/* ------------------------------------------------------------------ */

"use client";

import { experiences } from "../../lib/experiences";
import { useFavoritesContext } from "../../components/FavoritesProvider";

/**
 * Profile page — shows a faux "user" card with stats derived from
 * favorites and total available experiences.
 */
export default function ProfilePage() {
  const { favoriteCount } = useFavoritesContext();

  const totalExperiences = experiences.filter((e) => e.isActive).length;
  const continents = new Set(
    experiences.filter((e) => e.isActive).map((e) => e.continent),
  ).size;
  const categories = new Set(
    experiences.filter((e) => e.isActive).map((e) => e.category),
  ).size;

  return (
    <div className="container" style={{ paddingTop: "1.25rem" }}>
      <h1 className="page-title">Profile</h1>

      {/* ── User card ──────────────────────────────────────────── */}
      <div className="profile-card">
        <div className="profile-card__avatar">🧑‍✈️</div>
        <h2 className="profile-card__name">Alex Traveller</h2>
        <p className="profile-card__email">alex@wanderlust.app</p>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
          Member since January 2024
        </p>
      </div>

      {/* ── Stats grid ─────────────────────────────────────────── */}
      <div className="profile-stats">
        <div className="profile-stat">
          <div className="profile-stat__value">{favoriteCount}</div>
          <div className="profile-stat__label">Favorites</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat__value">{totalExperiences}</div>
          <div className="profile-stat__label">Total Experiences</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat__value">{continents}</div>
          <div className="profile-stat__label">Continents</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat__value">{categories}</div>
          <div className="profile-stat__label">Categories</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat__value">
            {experiences
              .filter((e) => e.isActive)
              .reduce((acc, e) => acc + e.reviewCount, 0)
              .toLocaleString()}
          </div>
          <div className="profile-stat__label">Total Reviews</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat__value">
            {experiences
              .filter((e) => e.isActive)
              .reduce((acc, e) => acc + e.price, 0) === 0
              ? "—"
              : `$${(
                experiences
                  .filter((e) => e.isActive)
                  .reduce((acc, e) => acc + e.price, 0)
              ).toLocaleString()}`}
          </div>
          <div className="profile-stat__label">Total Value</div>
        </div>
      </div>

      {/* ── Quick links ────────────────────────────────────────── */}
      <div style={{ marginTop: "1.5rem" }}>
        <a href="/favorites" style={{ display: "inline-block", marginRight: "1rem" }}>
          View your favorites →
        </a>
        <a href="/experiences">Browse all experiences →</a>
      </div>
    </div>
  );
}