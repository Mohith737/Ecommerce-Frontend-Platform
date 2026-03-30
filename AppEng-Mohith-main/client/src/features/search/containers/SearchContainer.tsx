import { useEffect, useMemo, useState } from 'react';
import { type ProductOut } from '@/api-sdk';
import { useToast } from '@/design-system/ui/molecules';
import { useAuth } from '@/providers/AuthProvider';
import { useCart } from '@/providers/CartProvider';
import { useSearchStore } from '@/stores/searchStore';
import { navigate } from '@/utils/navigate';
import { useDemoProductsQuery } from '../hooks/useDemoProductsQuery';
import { useSearchResultsQuery } from '../hooks/useSearchResultsQuery';
import type { SearchState } from '../types';
import { NoResults } from '../components/NoResults';
import { RecentSearches } from '../components/RecentSearches';
import { SearchResultsGrid } from '../components/SearchResultsGrid';
import { TrendingProducts } from '../components/TrendingProducts';

interface SearchContainerProps {
  params: Record<string, string>;
}

function FeaturedStrip({ products }: { products: ProductOut[] }) {
  return (
    <section style={{ marginTop: 12 }}>
      <div
        style={{
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3
          style={{
            fontSize: 34,
            lineHeight: 1.05,
            fontWeight: 800,
            color: 'var(--color-text-primary)',
          }}
        >
          Featured Products
        </h3>
        <button
          type="button"
          onClick={() => navigate('/plp')}
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--color-primary)',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          View all
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
        {products.slice(0, 4).map(product => (
          <button
            key={`home-backdrop-${product.id}`}
            type="button"
            onClick={() => navigate(`/pdp/${product.id}`)}
            style={{ border: 'none', background: 'transparent', textAlign: 'left', padding: 0 }}
          >
            <img
              src={product.image_url}
              alt={product.name}
              style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: 12, objectFit: 'cover' }}
            />
            <p
              style={{
                marginTop: 6,
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
              }}
            >
              {product.name}
            </p>
            <p
              style={{ marginTop: 2, fontSize: 14, fontWeight: 800, color: 'var(--color-primary)' }}
            >
              ${product.price.toFixed(2)}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export function SearchContainer({ params }: SearchContainerProps) {
  const [query, setQuery] = useState(() => params.q ?? '');
  const { isAuthenticated, isGuest } = useAuth();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    setCurrentQuery,
  } = useSearchStore();

  const demoProductsQuery = useDemoProductsQuery();
  const resultsQuery = useSearchResultsQuery(query);

  useEffect(() => {
    setCurrentQuery(query);
  }, [query, setCurrentQuery]);

  const searchState: SearchState = useMemo(() => {
    if (query.trim().length < 2) return 'idle';
    if (resultsQuery.isLoading) return 'searching';

    if (resultsQuery.data !== undefined) {
      const items = resultsQuery.data.pages.flatMap(pageData => pageData.items);
      return items.length > 0 ? 'results' : 'no-results';
    }

    return 'searching';
  }, [query, resultsQuery.data, resultsQuery.isLoading]);

  const results = useMemo(() => {
    if (!resultsQuery.data) return [] as ProductOut[];
    return resultsQuery.data.pages.flatMap(pageData => pageData.items);
  }, [resultsQuery.data]);

  const totalResults = resultsQuery.data?.pages[0]?.total ?? 0;

  const handleSubmit = (value: string) => {
    const next = value.trim();
    setQuery(next);

    if (!next) {
      navigate('/search');
      return;
    }

    addRecentSearch(next);
    navigate(`/search?q=${encodeURIComponent(next)}`);
  };

  const handleProductClick = (product: ProductOut) => {
    navigate(`/pdp/${product.id}`);
  };

  const handleAddToCart = async (product: ProductOut) => {
    if (isGuest || !isAuthenticated) {
      showToast({
        message: 'Please sign in to add items to your cart.',
        type: 'info',
        action: { label: 'Sign In', onClick: () => navigate('/sign-in') },
      });
      return;
    }

    await addItem(product.id, 1);
    showToast({ message: 'Added to cart', type: 'success' });
  };

  return (
    <div
      className="space-y-4"
      style={{
        width: 'min(1220px, calc(100% - 24px))',
        margin: '0 auto',
        paddingTop: 14,
        paddingBottom: 24,
      }}
    >
      {searchState === 'idle' ? (
        <>
          <RecentSearches
            searches={recentSearches}
            onSelect={recentQuery => handleSubmit(recentQuery)}
            onRemove={removeRecentSearch}
            onClearAll={clearRecentSearches}
          />

          <TrendingProducts
            products={demoProductsQuery.data ?? []}
            isLoading={demoProductsQuery.isLoading}
            onProductClick={handleProductClick}
          />

          <FeaturedStrip products={demoProductsQuery.data ?? []} />
        </>
      ) : null}

      {searchState === 'searching' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14 }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`search-skeleton-${index}`}
              style={{
                borderRadius: 10,
                border: '1px solid var(--color-border)',
                background: 'var(--color-white)',
                padding: 10,
              }}
            >
              <div
                style={{
                  aspectRatio: '4 / 3',
                  borderRadius: 8,
                  background: 'var(--color-gray-200)',
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: 'var(--color-gray-200)',
                }}
              />
              <div
                style={{
                  marginTop: 6,
                  width: '66%',
                  height: 8,
                  borderRadius: 9999,
                  background: 'var(--color-gray-200)',
                }}
              />
            </div>
          ))}
        </div>
      ) : null}

      {searchState === 'results' ? (
        <SearchResultsGrid
          products={results}
          query={query}
          totalCount={totalResults}
          hasNextPage={Boolean(resultsQuery.hasNextPage)}
          isFetchingNextPage={resultsQuery.isFetchingNextPage}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          onLoadMore={() => {
            void resultsQuery.fetchNextPage();
          }}
        />
      ) : null}

      {searchState === 'no-results' ? (
        <div
          style={{
            minHeight: 440,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <NoResults
            query={query}
            onClearSearch={() => {
              setQuery('');
              navigate('/search');
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
