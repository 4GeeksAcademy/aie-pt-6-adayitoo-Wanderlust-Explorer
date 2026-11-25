/* ------------------------------------------------------------------ */
/*  experiences/[id]/page.tsx – Single experience detail page          */
/* ------------------------------------------------------------------ */

"use client";

import { useParams } from "next/navigation";
import { getExperienceById } from "../../../lib/experiences";
import { useFavoritesContext } from "../../../components/FavoritesProvider";
import FavoriteButton from "../../../components/FavoriteButton";

/**
 * Experience detail page — shows full info for a single experience.
 * The route param `id` is read from the URL.
 */
export default function ExperienceDetailPage() {
  const params = useParams();
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  const experience = getExperienceById(params.id ?? "");

  /* ── 404: experience not found ─────────────────────────────── */
  if (!experience) {
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <div className="empty-state">
          <div className="empty-state__icon">😕</div>
          <h1 className="empty-state__title">Experience not found</h1>
          <p className="empty-state__text">
            The experience you're looking for doesn't exist or has been removed.
          </p>
          <a href="/experiences" style={{ marginTop: "1rem", display: "inline-block" }}>
            ← Back to all experiences
          </a>
        </div>
      </div>
    );
  }

  const {
    id,
    title,
    subtitle,
    description,
    category,
    tags,
    difficulty,
    duration,
    price,
    rating,
    reviewCount,
    imageUrl,
    location,
    country,
    continent,
  } = experience;

  return (
    <>
      {/* ── Hero image ──────────────────────────────────────────── */}
      <div className="detail-hero">
        <img
          className="detail-hero__image"
          src={imageUrl}
          alt={title}
        />
        <div className="detail-hero__overlay">
          <h1 className="detail-hero__title">{title}</h1>
          <div className="detail-hero__meta">
            <span>📍 {location}, {country}</span>
            <span>🌍 {continent}</span>
            <span>🔥 {difficulty}</span>
            <span>⏱ {duration}</span>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="detail-body">
        <section className="detail-body__section">
          <p style={{ fontSize: "1.1rem", fontStyle: "italic" }}>
            {subtitle}
          </p>
        </section>

        <section className="detail-body__section">
          <h2>About this experience</h2>
          <p>{description}</p>
        </section>

        <section className="detail-body__section">
          <h2>Tags</h2>
          <div className="detail-tags">
            {tags.map((tag) => (
              <span key={tag} className="detail-tag">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────────────── */}
        <section
          className="detail-body__section"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.75rem",
          }}
        >
          <div className="profile-stat">
            <div className="profile-stat__value">
              {rating.toFixed(1)}
            </div>
            <div className="profile-stat__label">
              Rating ({reviewCount} reviews)
            </div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat__value">{difficulty}</div>
            <div className="profile-stat__label">Difficulty</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat__value">{duration}</div>
            <div className="profile-stat__label">Duration</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat__value">
              {price === 0 ? "Free" : `$${price.toLocaleString()}`}
            </div>
            <div className="profile-stat__label">Price</div>
          </div>
        </section>

        {/* ── Actions ────────────────────────────────────────── */}
        <section className="detail-body__section">
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <FavoriteButton
              experienceId={id}
              isFavorite={isFavorite(id)}
              onToggle={toggleFavorite}
            />
            <span>
              {isFavorite(id)
                ? "Saved to your favorites ❤️"
                : "Click the heart to save"}
            </span>
          </div>
        </section>

        {/* ── Back link ───────────────────────────────────────── */}
        <section className="detail-body__section">
          <a href="/experiences" style={{ display: "inline-block", marginTop: "0.5rem" }}>
            ← Back to all experiences
          </a>
        </section>
      </div>
    </>
  );
}