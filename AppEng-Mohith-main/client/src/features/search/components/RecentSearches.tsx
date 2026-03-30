import clockIcon from '@/assets/icons/clock.svg';
import closeIcon from '@/assets/icons/close.svg';
import trendingIcon from '@/assets/icons/trending.svg';
import type { RecentSearch } from '../types';

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (query: string) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

const TRENDING_KEYWORDS = ['Gaming Mouse', 'Mechanical Keyboard', 'USB-C Hub'];

export function RecentSearches({ searches, onSelect, onRemove, onClearAll }: RecentSearchesProps) {
  return (
    <section
      data-testid="recent-searches"
      style={{
        borderRadius: 14,
        border: '1px solid var(--color-border)',
        background: 'var(--color-white)',
        padding: '14px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: 'var(--color-text-muted)',
          }}
        >
          RECENT SEARCHES
        </p>
        {searches.length > 0 ? (
          <button
            type="button"
            onClick={onClearAll}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Clear all
          </button>
        ) : null}
      </div>

      <ul style={{ marginTop: 8, display: 'grid', gap: 6 }}>
        {(searches.length
          ? searches.slice(0, 3)
          : [
              { id: 's1', query: 'wireless headphones' },
              { id: 's2', query: 'laptop dell xps' },
              { id: 's3', query: 'smart watch' },
            ]
        ).map(search => (
          <li key={search.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              data-testid="recent-search-item"
              type="button"
              onClick={() => onSelect(search.query)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                minWidth: 0,
                flex: 1,
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                padding: 0,
              }}
            >
              <img src={clockIcon} alt="clock" style={{ width: 14, height: 14, opacity: 0.7 }} />
              <span
                style={{
                  fontSize: 14,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {search.query}
              </span>
            </button>
            {searches.length > 0 ? (
              <button
                type="button"
                onClick={event => {
                  event.stopPropagation();
                  onRemove(search.id);
                }}
                aria-label={`Remove ${search.query}`}
                style={{ border: 'none', background: 'transparent', padding: 0, opacity: 0.7 }}
              >
                <img src={closeIcon} alt="remove" style={{ width: 14, height: 14 }} />
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <p
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
          }}
        >
          <img src={trendingIcon} alt="trending" style={{ width: 12, height: 12 }} />
          Trending Searches
        </p>
        <ul style={{ marginTop: 8, display: 'grid', gap: 6 }}>
          {TRENDING_KEYWORDS.map(keyword => (
            <li key={keyword}>
              <button
                type="button"
                onClick={() => onSelect(keyword)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  fontSize: 14,
                  color: 'var(--color-text-primary)',
                }}
              >
                {keyword}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
