/* ------------------------------------------------------------------ */
/*  src/components/Navbar.tsx – Navigation bar with active link        */
/*  Uses usePathname to highlight the current route. Responsive.       */
/* ------------------------------------------------------------------ */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Explorer" },
  { href: "/favorites", label: "Favorites" },
  { href: "/profile", label: "Profile" },
] as const;

/**
 * Navbar – sticky top navigation bar with Wanderlust branding
 * and links to the main sections. The active link is highlighted
 * with Tailwind classes based on the current pathname.
 */
export function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string): string => {
    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);

    return isActive
      ? "text-blue-600 font-bold border-b-2 border-blue-600"
      : "text-gray-600 hover:text-gray-900 transition-colors";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-indigo-700 hover:text-indigo-500 transition-colors shrink-0"
        >
          ✈ Wanderlust
        </Link>
        <nav
          className="flex gap-4 sm:gap-6 text-sm font-medium overflow-x-auto"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap pb-1 ${linkClass(href)}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;