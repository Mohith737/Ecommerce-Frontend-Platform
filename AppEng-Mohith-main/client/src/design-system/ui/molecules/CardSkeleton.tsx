export function CardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white"
      data-testid="card-skeleton"
    >
      <div className="aspect-[4/3] animate-pulse bg-[var(--color-gray-200)]" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-[var(--color-gray-200)]" />
        <div className="h-4 animate-pulse rounded bg-[var(--color-gray-200)]" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--color-gray-200)]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--color-gray-200)]" />
        <div className="mt-1 h-5 w-2/5 animate-pulse rounded bg-[var(--color-gray-200)]" />
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      data-testid="card-skeleton-grid"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
