/* ------------------------------------------------------------------ */
/*  src/components/ExperienceCard.tsx – Card component for a single    */
/*  travel experience. Includes the favourite heart button inline.     */
/* ------------------------------------------------------------------ */

"use client";

import type { Experience } from "../types/index";
import { useFavoritesContext } from "./FavoritesProvider";

export interface ExperienceCardProps {
  experience: Experience;
}

/**
 * ExperienceCard – renders a single experience as a card.
 * Heart icon in the top-right corner reflects the favourite state.
 */
export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { id, title, subtitle, category, difficulty, duration, price, rating, reviewCount, imageUrl, location, country } = experience;

  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const fav = isFavorite(id);

  const fullStars = Math.round(rating);
  const emptyStars = 5 - fullStars;

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white transition-shadow duration-300 hover:shadow-xl">
      {/* ── Image ────────────────────────────────────────────── */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
          {category}
        </span>
        <button
          className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full w-8 h-8 bg-white/80 hover:bg-white/60 transition-colors text-lg"
          onClick={() => toggleFavorite(id)}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={fav}
          type="button"
        >
          <span aria-hidden="true">{fav ? "❤️" : "🤍"}</span>
        </button>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-4">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-500" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {subtitle}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-400">
          <span>📍 {location}, {country}</span>
          <span>⏱ {duration}</span>
          <span>🔥 {difficulty}</span>
        </div>

        {/* Footer: rating + price */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">
              {"★".repeat(fullStars)}{"☆".repeat(emptyStars)}
            </span>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>
          <div className="text-right">
            {price === 0 ? (
              <span className="text-sm font-semibold text-green-600">Free</span>
            ) : (
              <span className="text-sm font-semibold text-gray-900">
                ${price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-1">
          <a
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            href={`/experiences/${id}`}
          >
            View Details →
          </a>
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;