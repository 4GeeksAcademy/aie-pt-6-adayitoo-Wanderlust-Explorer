/* ------------------------------------------------------------------ */
/*  src/app/profile/page.tsx – Profile page                         */
/*  Client Component. Perfil simulado + resumen de favoritos.       */
/* ------------------------------------------------------------------ */

"use client";

import Link from "next/link";
import { useFavoritesContext } from "../../components/FavoritesProvider";

/**
 * ProfilePage – simulated user profile with a stats card showing the
 * number of saved favorites.
 */
export default function ProfilePage() {
  const { favoriteCount } = useFavoritesContext();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Profile card ──────────────────────────────────────────── */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden">
        {/* Cover photo placeholder */}
        <div
          className="h-32 bg-gradient-to-r from-indigo-500 to-sky-400"
        />

        <div className="px-6 py-6 flex items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl shadow-md">
            🧑‍✈️
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Alex Wanderer</h1>
            <p className="text-sm text-gray-400">alex@wanderlustlabs.com</p>
            <p className="mt-2 text-gray-600 max-w-md">
              Passionate traveller and experience curator. Always on the lookout
              for the next adventure &mdash; whether it is scaling a glacier or
              tasting street food in a bustling market.
            </p>
          </div>
        </div>
      </div>

      {/* ── Favorites summary widget ──────────────────────────────── */}
      <div className="mt-10 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-4xl">❤️</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Saved Experiences
            </h2>
            <p className="text-gray-600 mt-1">
              You have <strong className="text-indigo-700">{favoriteCount}</strong> experience
              {favoriteCount === 1 ? "" : "s"} saved to your wishlist.
            </p>
          </div>
        </div>

        {favoriteCount > 0 && (
          <div className="mt-4">
            <Link
              href="/favorites"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              View your favorites &rarr;
            </Link>
          </div>
        )}

        {favoriteCount === 0 && (
          <div className="mt-4">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Explore experiences &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* ── Quick stats ──────────────────────────────────────────── */}
      <div className="mt-10 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{favoriteCount}</div>
          <div className="text-xs text-gray-400 mt-1">Favorites</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">100</div>
          <div className="text-xs text-gray-400 mt-1">Total Experiences</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">5</div>
          <div className="text-xs text-gray-400 mt-1">Categories</div>
        </div>
      </div>
    </section>
  );
}
