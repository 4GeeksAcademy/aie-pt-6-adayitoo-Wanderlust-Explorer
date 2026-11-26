/* ------------------------------------------------------------------ */
/*  src/app/experiences/[id]/page.tsx – Experience detail page       */
/*  Server Component. Busca por ID, muestra toda la info.            */
/*  Uses a small client component (DocumentTitle) for the title tag. */
/* ------------------------------------------------------------------ */

import { notFound } from "next/navigation";
import { getExperienceById } from "../../../data/experiences";
import Link from "next/link";
import DocumentTitle from "../../../components/DocumentTitle";

interface DetailParams {
  id: string;
}

/**
 * ExperienceDetailPage – shows full information for a single experience.
 * If the ID is not found, calls notFound() to trigger a 404.
 */
export default function ExperienceDetailPage({
  params,
}: {
  params: DetailParams;
}) {
  const { id } = params;
  const experience = getExperienceById(id);

  if (!experience) {
    notFound();
    return;
  }

  const {
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

  /* Stars display */
  const fullStars = Math.round(rating);
  const emptyStars = 5 - fullStars;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Dynamic document title ──────────────────────────── */}
      <DocumentTitle title={`${title} — Wanderlust Explorer`} />

      {/* ── Back link ──────────────────────────────────────────── */}
      <Link
        href="/experiences"
        className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 mb-6"
      >
        &larr; Back to all experiences
      </Link>

      {/* ── Hero image ─────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
        <img
          className="w-full max-h-96 object-cover"
          src={imageUrl}
          alt={title}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
          <p className="text-lg text-white/80">{subtitle}</p>
        </div>
      </div>

      {/* ── Meta badges row ──────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-800">
          {category}
        </span>
        <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
          🔥 {difficulty}
        </span>
        <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
          ⏱ {duration}
        </span>
        <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
          📍 {location}, {country}
        </span>
        <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
          🌍 {continent}
        </span>
      </div>

      {/* ── Description ──────────────────────────────────────────── */}
      <section className="prose max-w-none mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">About this experience</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </section>

      {/* ── Tags ──────────────────────────────────────────────────── */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── Stats grid ──────────────────────────────────────────── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {rating.toFixed(1)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Rating ({reviewCount} reviews)
          </div>
          <div className="text-yellow-500 text-sm mt-1">
            {"★".repeat(fullStars)}{"☆".repeat(emptyStars)}
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{difficulty}</div>
          <div className="text-xs text-gray-400 mt-1">Difficulty</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{duration}</div>
          <div className="text-xs text-gray-400 mt-1">Duration</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {price === 0 ? "Free" : `$${price.toLocaleString()}`}
          </div>
          <div className="text-xs text-gray-400 mt-1">Price</div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────── */}
      <div className="text-center py-4">
        <Link
          href="/experiences"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          &larr; Back to all experiences
        </Link>
      </div>
    </article>
  );
}
