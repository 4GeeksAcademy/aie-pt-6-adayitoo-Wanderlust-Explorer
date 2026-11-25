/* ------------------------------------------------------------------ */
/*  page.tsx – Home page (/app) — Hero + featured experiences          */
/*  Quick search navigates to /experiences?search=...                  */
/* ------------------------------------------------------------------ */

"use client";

import { experiences } from "../lib/experiences";
import ExperienceCard from "../components/ExperienceCard";
import { useFavoritesContext } from "../components/FavoritesProvider";

/**
 * Home page — shows a hero banner and a subset of featured experiences.
 * The user can type a search term and navigate to /experiences?search=...
 * for the full filterable experience browser.
 */
export default function HomePage() {
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  /* ── Featured subset (first 6 active, popular) ──────────── */
  const featured = experiences
    .filter((e) => e.isActive)
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 6);

  function onSearchQuery(term: string): void {
    const params = term ? `?search=${encodeURIComponent(term)}` : "";
    window.location.href = `/experiences${params}`;
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="home-hero">
        <h1 className="home-hero__title">Wanderlust Explorer</h1>
        <p className="home-hero__subtitle">
          Curated travel experiences for the modern explorer. From adrenaline‑
          pumping adventures to serene wellness retreats — find your next
          unforgettable journey.
        </p>
        <a className="home-hero__cta" href="/experiences">
          Explore All Experiences
        </a>
      </section>

      {/* ── Quick search ───────────────────────────────────────── */}
      <section className="container" style={{ marginTop: "1rem" }}>
        <div
          className="search-bar"
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <span className="search-bar__icon" aria-hidden="true">
            🔍
          </span>
          <input
            className="search-bar__input"
            type="search"
            placeholder="Search experiences\u2026"
            autoComplete="off"
            aria-label="Search experiences"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const input = e.currentTarget as HTMLInputElement;
                onSearchQuery(input.value);
              }
            }}
          />
          <button
            className="search-bar__submit"
            type="button"
            onClick={() => {
              const input = document.querySelector(
                ".search-bar__input",
              ) as HTMLInputElement | null;
              onSearchQuery(input?.value ?? "");
            }}
          >
            Search
          </button>
        </div>
      </section>

      {/* ── Featured experiences ───────────────────────────────── */}
      <section className="container" style={{ marginTop: "1.5rem" }}>
        <h2 className="page-title">Featured Experiences</h2>
        <p className="page-subtitle">
          Top‑rated adventures hand‑picked for you.
        </p>
        <div className="experience-grid">
          {featured.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              isFavorite={isFavorite(exp.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* ── Why Wanderlust? ────────────────────────────────────── */}
      <section className="container" style={{ marginTop: "2rem" }}>
        <div className="layout-with-sidebar">
          <div className="layout-main">
            <h2 className="page-title">Why Wanderlust?</h2>
            <p>
              Every experience on our platform is vetted by real travellers
              and curated for quality. Whether you are seeking the rush of a
              bungee jump, the serenity of a mountain retreat, or the flavours
              of a street‑food crawl — we help you discover, plan, and book
              with confidence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}