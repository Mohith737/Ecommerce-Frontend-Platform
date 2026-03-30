const SkeletonBox = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-[var(--color-gray-200)] ${className}`} />
);

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]" data-testid="page-skeleton">
      <div className="flex h-16 items-center gap-6 border-b border-[var(--color-border)] bg-white px-8">
        <SkeletonBox className="h-7 w-32" />
        <SkeletonBox className="h-9 max-w-lg flex-1 rounded-full" />
        <div className="ml-auto flex gap-3">
          <SkeletonBox className="h-9 w-20" />
          <SkeletonBox className="h-9 w-20" />
        </div>
      </div>
      <div className="flex">
        <div className="min-h-[calc(100vh-64px)] w-60 space-y-3 border-r border-[var(--color-border)] bg-white p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBox key={i} className="h-9" />
          ))}
        </div>
        <div className="flex-1 p-8">
          <SkeletonBox className="mb-8 h-48 w-full rounded-2xl" />
          <SkeletonBox className="mb-4 h-6 w-48" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white"
              >
                <SkeletonBox className="aspect-[4/3] w-full" />
                <div className="space-y-2 p-4">
                  <SkeletonBox className="h-3 w-1/3" />
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-4 w-3/4" />
                  <SkeletonBox className="h-5 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
