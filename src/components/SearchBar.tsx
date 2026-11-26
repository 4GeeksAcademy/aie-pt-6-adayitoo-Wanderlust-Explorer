/* ------------------------------------------------------------------ */
/*  src/components/SearchBar.tsx – Search input with debounce (~300ms) */
/*  Updates the `search` query param after the user stops typing.     */
/* ------------------------------------------------------------------ */

"use client";

import { useState, useEffect, useRef } from "react";

export interface SearchBarProps {
  /** Current search value from the URL */
  initialValue: string;
  /** Callback invoked after the debounce delay */
  onSearch: (term: string) => void;
}

/**
 * SearchBar – text input with 300 ms debounce.
 * - `initialValue` pre-fills the input (from URL query param).
 * - `onSearch` fires after the debounce period with the trimmed term.
 */
export function SearchBar({ initialValue, onSearch }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const isFirstRender = useRef(true);

  // Sync local state when the URL changes (e.g. browser back/forward)
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Debounce: wait 300 ms after the last keystroke before calling onSearch
  useEffect(() => {
    // Skip the very first render to avoid overwriting URL on mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative w-full sm:w-72">
      <label htmlFor="search-input" className="sr-only">
        Search experiences
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Search by title…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
      />
      {/* Magnifying-glass icon */}
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
    </div>
  );
}

export default SearchBar;