export type SortOption = 'price_asc' | 'price_desc' | 'popularity' | 'rating';

interface SortBarProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
];

export function SortBar({ sort, onSortChange, resultCount }: SortBarProps) {
  return (
    <div
      data-testid="sort-bar"
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}
    >
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', flexShrink: 0 }}>
        {resultCount} products found
      </span>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {SORT_OPTIONS.map(option => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid',
              borderColor: sort === option.value ? 'var(--color-primary)' : 'var(--color-border)',
              background: sort === option.value ? 'var(--color-primary)' : 'var(--color-white)',
              color: sort === option.value ? 'var(--color-white)' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              fontWeight: sort === option.value ? 'var(--font-semibold)' : 'var(--font-normal)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
