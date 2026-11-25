/* ------------------------------------------------------------------ */
/*  useUrlFilters.ts – Reusable hook to read/write URL search params   */
/*  without page reload. Query params: search, category, destination.  */
/*  Uses router.replace + manual transition tracking for pending state. */
/* ------------------------------------------------------------------ */

"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export interface UseUrlFiltersReturn {
  /** Read a single query param value (null if absent/empty). */
  getParam: (key: string) => string | null;
  /**
   * Set a single query param via router.replace (no reload, no history entry).
   * Passing null / "" / undefined removes the param from the URL entirely.
   * Works with back/forward navigation.
   */
  setParam: (key: string, value: string | null | undefined) => void;
  /**
   * Set multiple params at once. No-op if nothing changed.
   */
  setParams: (params: Record<string, string | null | undefined>) => void;
  /** True while the router.replace transition is in-flight. */
  isPending: boolean;
}

/**
 * useUrlFilters – Derives filter state from URL query params and
 * provides helpers to mutate them via router.replace (no reload).
 *
 * Usage:
 *   const { getParam, setParam, setParams, isPending } = useUrlFilters();
 *   setParam("search", "vela")          // -> ?search=vela
 *   setParam("category", null)          // removes ?category=
 *   setParams({ search: "vela", category: null })
 */
export function useUrlFilters(): UseUrlFiltersReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);

  /** Read a single query param – returns null if absent or empty string. */
  function getParam(key: string): string | null {
    const v = searchParams.get(key);
    return v ?? null;
  }

  /**
   * Wraps router.replace in a small transition (pending) flag so that
   * consumers can show a spinner while the URL replacement is in flight.
   * router.replace is synchronous, but we briefly flash the pending state
   * for a visual cue (e.g. the SearchBar spinner).
   */
  function startTransition(callback: () => void): void {
    setIsPending(true);
    callback();
    /* Clear pending after a short tick so the UI gets a visible cue. */
    requestAnimationFrame(() => {
      setIsPending(false);
    });
  }

  /**
   * Set or remove a single query param.
   * - null / undefined / "" -> delete the param
   * - any other string -> set the param
   * Uses router.replace so the page does NOT reload, and scroll:false
   * prevents the viewport from jumping.
   */
  function setParam(key: string, value: string | null | undefined): void {
    const sp = new URLSearchParams(searchParams.toString());
    if (value === null || value === undefined || value === "") {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    const qs = sp.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  }

  /**
   * Set or remove multiple params at once. Only touches the provided keys;
   * all other existing params are preserved.
   */
  function setParams(params: Record<string, string | null | undefined>): void {
    const sp = new URLSearchParams(searchParams.toString());
    let changed = false;
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined || value === "") {
        if (sp.has(key)) {
          sp.delete(key);
          changed = true;
        }
      } else {
        sp.set(key, value);
        changed = true;
      }
    }
    if (!changed) return;
    const qs = sp.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  }

  return { getParam, setParam, setParams, isPending };
}