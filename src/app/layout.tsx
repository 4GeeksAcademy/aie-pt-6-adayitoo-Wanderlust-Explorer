/* ------------------------------------------------------------------ */
/*  src/app/layout.tsx – Root layout. Wraps every page with the        */
/*  FavoritesProvider, Navbar, and footer.                             */
/* ------------------------------------------------------------------ */

import type { ReactNode } from "react";
import { FavoritesProvider } from "../components/FavoritesProvider";
import Navbar from "../components/Navbar";

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * RootLayout – HTML shell with FavoritesProvider, Navbar, and footer
 * wrapping the entire application.
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
            <Navbar />

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