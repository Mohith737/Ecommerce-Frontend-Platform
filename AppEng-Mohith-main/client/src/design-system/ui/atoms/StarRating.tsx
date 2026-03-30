interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 14,
  showValue = false,
  showCount = false,
  count,
}: StarRatingProps) {
  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: maxStars }, (_, i) => {
        const index = i + 1;
        const fill = Math.max(0, Math.min(1, rating - i));
        const id = `star-grad-${i}-${Math.round(rating * 100)}`;
        return (
          <svg key={id} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={id}>
                <stop offset={`${fill * 100}%`} stopColor="#f59e0b" />
                <stop offset={`${fill * 100}%`} stopColor="var(--color-gray-200)" />
              </linearGradient>
            </defs>
            <polygon
              fill={index <= rating + 1 ? `url(#${id})` : 'var(--color-gray-200)'}
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            />
          </svg>
        );
      })}
      {showValue ? <span style={{ fontSize: 'var(--text-xs)' }}>{rating.toFixed(1)}</span> : null}
      {showCount && typeof count === 'number' ? (
        <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
          ({count.toLocaleString()})
        </span>
      ) : null}
    </div>
  );
}
