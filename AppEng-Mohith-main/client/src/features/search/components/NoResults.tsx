import noResultsIcon from '@/assets/icons/no-results.svg';
import { Button } from '@/design-system/ui/atoms';

interface NoResultsProps {
  query: string;
  onClearSearch: () => void;
}

export function NoResults({ query, onClearSearch }: NoResultsProps) {
  return (
    <div
      data-testid="no-results"
      style={{
        margin: '0 auto',
        width: '100%',
        maxWidth: 520,
        borderRadius: 14,
        border: '1px solid var(--color-border)',
        background: 'var(--color-white)',
        padding: 28,
        textAlign: 'center',
        boxShadow: '0 18px 28px -18px rgba(15,23,42,0.35)',
      }}
    >
      <img
        src={noResultsIcon}
        alt="No results"
        style={{ margin: '0 auto', width: 64, height: 64, opacity: 0.65 }}
      />
      <h3
        style={{
          marginTop: 14,
          fontSize: 34,
          lineHeight: 1.1,
          fontWeight: 800,
          color: 'var(--color-text-primary)',
        }}
      >
        No Results Found
      </h3>
      <p style={{ marginTop: 8, fontSize: 16, color: 'var(--color-text-secondary)' }}>
        No results found for "{query}". Try different keywords.
      </p>
      <Button variant="outline" style={{ marginTop: 20 }} onClick={onClearSearch}>
        Clear Search
      </Button>
    </div>
  );
}
