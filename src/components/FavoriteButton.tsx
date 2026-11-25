/* ------------------------------------------------------------------ */
/*  src/components/FavoriteButton.tsx – Heart toggle for wishlist     */
/* ------------------------------------------------------------------ */

export interface FavoriteButtonProps {
  experienceId: string;
  isFavorite: boolean;
  onToggle: (experienceId: string) => void;
}

export function FavoriteButton({
  experienceId,
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-white/80 hover:bg-white/60 transition-colors text-lg"
      onClick={() => onToggle(experienceId)}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      type="button"
    >
      <span aria-hidden="true">
        {isFavorite ? "❤️" : "🤍"}
      </span>
    </button>
  );
}

export default FavoriteButton;