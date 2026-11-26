/* ------------------------------------------------------------------ */
/*  src/components/DocumentTitle.tsx – Sets document.title via effect  */
/*  Small client component to work inside a Server Components page.   */
/* ------------------------------------------------------------------ */

"use client";

import { useEffect } from "react";

/**
 * DocumentTitle – client component that updates `document.title`
 * to the given `title` string whenever it changes.
 */
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

export default DocumentTitle;