/* ------------------------------------------------------------------ */
/*  FavoriteButton.tsx – Heart‑style toggle button for wishlist items  */
/* ------------------------------------------------------------------ */

interface FavoriteButtonProps {
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
      className={`favorite-button ${isFavorite ? "favorite-button--active" : ""}`}
      onClick={() => onToggle(experienceId)}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      type="button"
    >
      <span className="favorite-button__icon" aria-hidden="true">
        {isFavorite ? "❤️" : "🤍"}
      </span>
    </button>
  );
}

export default FavoriteButton;