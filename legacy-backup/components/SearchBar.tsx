/* ------------------------------------------------------------------ */
/*  SearchBar.tsx – Controlled search input with debounce (~300 ms)    */
/*  and a visual spinner when a URL transition is pending.             */
/* ------------------------------------------------------------------ */

"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  /** Initial/current value from the URL param */
  initialValue: string;
  /**
   * Called after debounce (~300 ms of inactivity).
   * Receives the raw input string (empty string -> remove param).
   */
  onDebounce: (value: string) => void;
  /** True while router.replace transition is in-flight */
  isPending: boolean;
  placeholder?: string;
}

/**
 * SearchBar – Controlled input that debounces writes to the URL.
 * The value is pre-filled from `initialValue` (read from URL on mount).
 * Triggers `onDebounce` after 300 ms of inactivity.
 * The debounce timer reference is kept in state so it survives re-renders.
 */
export function SearchBar({
  initialValue,
  onDebounce,
  isPending,
  placeholder = "Search experiences\u2026",
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(initialValue);
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(null);

  /* ── Sync local value when URL changes externally (back/forward) ── */
  useEffect(() => {
    if (initialValue !== localValue) {
      setLocalValue(initialValue);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [initialValue]);

  function cancelTimer(): void {
    if (timerId !== null) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  }

  function handleInput(raw: string): void {
    setLocalValue(raw);
    cancelTimer();

    /* Debounce: wait 300 ms of inactivity before firing onDebounce */
    const id = setTimeout(() => {
      setTimerId(null);
      onDebounce(raw);
    }, 300);
    setTimerId(id);
  }

  function handleClear(): void {
    setLocalValue("");
    cancelTimer();
    onDebounce("");
  }

  /* Cleanup timer on unmount */
  useEffect(() => {
    return () => {
      if (timerId !== null) clearTimeout(timerId);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [timerId]);

  return (
    <div className="search-bar" style={{ position: "relative" }}>
      <span className="search-bar__icon" aria-hidden="true">
        🔍
      </span>
      <input
        className="search-bar__input"
        type="search"
        value={localValue}
        onChange={(e) => handleInput(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        aria-label="Search experiences"
      />
      {localValue.length > 0 && (
        <button
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
      {isPending && (
        <span
          className="search-bar__spinner"
          aria-hidden="true"
          style={{
            fontSize: "0.75rem",
            opacity: 0.5,
            marginLeft: "0.25rem",
          }}
        >
          ⏳
        </span>
      )}
    </div>
  );
}