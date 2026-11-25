/* ------------------------------------------------------------------ */
/*  src/app/page.tsx – Home page                                      */
/*  Server Component. Hero a pantalla completa con Tailwind.          */
/* ------------------------------------------------------------------ */

import Link from "next/link";

/**
 * HomePage – landing page with a full-screen hero section using a
 * gradient background and Tailwind utility classes.
 */
export default function HomePage() {
  return (
    <>
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Dark blue gradient background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 50%, #7eb8d9 100%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="text-sm font-medium tracking-widest text-blue-200 uppercase mb-4">
            Curated travel experiences
          </p>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Wanderlust<br />
            <span className="text-amber-300">
              Explorer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            From adrenaline-pumping adventures to serene wellness retreats &mdash;
            discover your next unforgettable journey, curated by real travellers.
          </p>

          {/* CTA button */}
          <div className="mt-10">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 text-lg font-semibold text-white hover:bg-white/40 hover:border-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore All Experiences
              <span className="text-2xl">&rarr;</span>
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100</div>
              <div className="text-sm text-blue-200 mt-1">Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5</div>
              <div className="text-sm text-blue-200 mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">6</div>
              <div className="text-sm text-blue-200 mt-1">Continents</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Value proposition cards ──────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900">Vetted Destinations</h3>
            <p className="mt-3 text-gray-500">
              Every experience is reviewed by real travellers so you book with confidence.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🎒</div>
            <h3 className="text-xl font-semibold text-gray-900">Curated Adventures</h3>
            <p className="mt-3 text-gray-500">
              From easy walks to extreme challenges &mdash; find the perfect level for you.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-gray-900">Save &amp; Compare</h3>
            <p className="mt-3 text-gray-500">
              Build your wishlist and compare experiences side by side.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
