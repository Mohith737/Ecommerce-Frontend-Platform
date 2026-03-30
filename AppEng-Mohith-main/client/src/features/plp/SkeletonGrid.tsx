export function SkeletonCard() {
  return (
    <div
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-gray-100)',
      }}
    >
      <div
        style={{
          aspectRatio: '4/3',
          background: 'var(--color-gray-200)',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
      <div style={{ padding: 'var(--space-4)' }}>
        <div
          style={{
            height: '12px',
            background: 'var(--color-gray-200)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-2)',
            width: '40%',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: '16px',
            background: 'var(--color-gray-200)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-2)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: '16px',
            background: 'var(--color-gray-200)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-3)',
            width: '75%',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: '20px',
            background: 'var(--color-gray-200)',
            borderRadius: 'var(--radius-sm)',
            width: '50%',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count }: { count: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-4)',
        marginTop: 'var(--space-4)',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
