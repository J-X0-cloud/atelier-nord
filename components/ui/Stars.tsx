interface StarsProps {
  rating: number;
  className?: string;
}

/** Text stars, rounded to the nearest whole star, as used throughout the site. */
export function Stars({ rating, className = "stars" }: StarsProps) {
  const full = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <span className={className} role="img" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}
