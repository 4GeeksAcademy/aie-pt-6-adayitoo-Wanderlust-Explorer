/* ------------------------------------------------------------------ */
/*  layout.tsx – Root layout wrapping all pages                        */
/* ------------------------------------------------------------------ */

import "./globals.css";
import type { UseFavoritesReturn } from "../hooks/useFavorites";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  favoritesContext: UseFavoritesReturn;
  currentPath: string;
}

/**
 * Main application layout — renders the header, main content slot,
 * and footer. Designed to be used as a "page wrapper" in e.g. Next.js
 * (app/layout.tsx) or any React routing setup.
 */
export default function Layout({
  children,
  favoritesContext,
  currentPath,
}: LayoutProps) {
  const { favoriteCount } = favoritesContext;

  /* ── Determine active nav link ────────────────────────────── */
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/experiences", label: "Explore" },
    { href: "/favorites", label: "Favorites" },
    { href: "/profile", label: "Profile" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Wanderlust Explorer</title>
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>
        {/* ── Header ───────────────────────────────────────── */}
        <header className="header" role="banner">
          <div className="header__inner">
            <a href="/" className="header__logo">
              ✈ Wanderlust
            </a>
            <nav className="header__nav" aria-label="Main navigation">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`header__link${isActive(href) ? " active" : ""}`}
                >
                  {label}
                  {href === "/favorites" && favoriteCount > 0 && (
                    <span className="header__favorite-count">
                      {favoriteCount}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* ── Main Content ─────────────────────────────────── */}
        <main role="main">{children}</main>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer className="footer" role="contentinfo">
          <p>
            &copy; {new Date().getFullYear()} Wanderlust Explorer &mdash;
            Discover your next adventure.
          </p>
        </footer>
      </body>
    </html>
  );
}