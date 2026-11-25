/* ------------------------------------------------------------------ */
/*  src/app/experiences/page.tsx – Explorer page                     */
/*  Server Component. Grid responsive con las 100 experiencias.      */
/* ------------------------------------------------------------------ */

import { experiences } from "../../data/experiences";
import ExperienceCard from "../../components/ExperienceCard";

/**
 * ExplorerPage – renders a responsive grid of all 100 experience cards.
 * Grid: 1 col en movil, 2 en tablet, 3-4 en desktop.
 */
export default function ExplorerPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Explore Experiences
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          Browse our curated collection of {experiences.length} travel experiences
          from across the globe.
        </p>
      </div>

      {/* Responsive grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {experiences
          .filter((e) => e.isActive)
          .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
          .map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
      </div>
    </section>
  );
}
