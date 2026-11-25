/* ------------------------------------------------------------------ */
/*  src/app/layout.tsx – Root layout. Wraps every page with the        */
/*  FavoritesProvider, header navigation, and footer.                  */
/* ------------------------------------------------------------------ */

import type { ReactNode } from "react";
import { FavoritesProvider } from "../components/FavoritesProvider";

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * RootLayout – minimal HTML shell with the FavoritesProvider wrapping
 * the entire application. Each page should wrap its content with this
 * layout so that the favorites context is available everywhere.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Wanderlust Explorer</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@3/dist/tailwind.min.css"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <FavoritesProvider>
          <div className="flex flex-col min-h-screen">
            {/* ── Header ────────────────────────────────────── */}
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <a
                  href="/"
                  className="text-xl font-bold tracking-tight text-indigo-700 hover:text-indigo-500 transition-colors"
                >
                  ✈ Wanderlust
                </a>
                <nav className="flex gap-6 text-sm font-medium" aria-label="Main navigation">
                  <a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a>
                  <a href="/experiences" className="text-gray-600 hover:text-indigo-600 transition-colors">Explore</a>
                  <a href="/favorites" className="text-gray-600 hover:text-indigo-600 transition-colors">Favorites</a>
                  <a href="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors">Profile</a>
                </nav>
              </div>
            </header>

            {/* ── Main content ──────────────────────────────── */}
            <main className="flex-1">{children}</main>

            {/* ── Footer ────────────────────────────────────── */}
            <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-auto">
              <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Wanderlust Explorer &mdash; Discover your next adventure.
              </div>
            </footer>
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}