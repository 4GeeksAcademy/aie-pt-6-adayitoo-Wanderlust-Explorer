/* ------------------------------------------------------------------ */
/*  ExperienceCard.tsx – Card component for displaying a single        */
/*  travel experience.                                                 */
/* ------------------------------------------------------------------ */

import type { Experience } from "../lib/types";
import FavoriteButton from "./FavoriteButton";

interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ExperienceCard({
  experience,
  isFavorite,
  onToggleFavorite,
}: ExperienceCardProps) {
  const { id, title, subtitle, category, difficulty, duration, price, rating, reviewCount, imageUrl, location, country } = experience;

  return (
    <article className="experience-card">
      {/* ── Image ────────────────────────────────────────────── */}
      <div className="experience-card__image-wrapper">
        <img
          className="experience-card__image"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />
        <FavoriteButton
          experienceId={id}
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
        />
        <span className="experience-card__category-badge">{category}</span>
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="experience-card__body">
        <h3 className="experience-card__title">{title}</h3>
        <p className="experience-card__subtitle">{subtitle}</p>

        <div className="experience-card__meta">
          <span className="experience-card__meta-item">
            <span className="icon">📍</span> {location}, {country}
          </span>
          <span className="experience-card__meta-item">
            <span className="icon">⏱</span> {duration}
          </span>
          <span className="experience-card__meta-item">
            <span className="icon">🔥</span> {difficulty}
          </span>
        </div>

        <div className="experience-card__footer">
          <div className="experience-card__rating">
            <span className="experience-card__stars">
              {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
            </span>
            <span className="experience-card__review-count">
              ({reviewCount})
            </span>
          </div>
          <div className="experience-card__price">
            {price === 0 ? (
              <span className="experience-card__price-free">Free</span>
            ) : (
              <span className="experience-card__price-value">
                ${price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <a
          className="experience-card__cta"
          href={`/experiences/${id}`}
        >
          View Details →
        </a>
      </div>
    </article>
  );
}

export default ExperienceCard;