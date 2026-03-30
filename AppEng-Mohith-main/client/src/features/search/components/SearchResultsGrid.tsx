import { useEffect, useRef } from 'react';
import type { ProductOut } from '@/api-sdk';
interface SearchResultsGridProps {
  products: ProductOut[];
  query: string;
  totalCount: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onProductClick: (product: ProductOut) => void;
  onAddToCart: (product: ProductOut) => void;
  onLoadMore: () => void;
}

export function SearchResultsGrid({
  products,
  query,
  totalCount,
  hasNextPage,
  isFetchingNextPage,
  onProductClick,
  onAddToCart,
  onLoadMore,
}: SearchResultsGridProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <section data-testid="search-results-grid" style={{ width: '100%', margin: '0 auto' }}>
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: 'var(--color-text-primary)' }}>
            All Products
          </h2>
          <p style={{ fontSize: 15, color: 'var(--color-text-muted)' }}>
            {totalCount} products found for "{query}"
          </p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
        {products.map(product => (
          <article
            key={product.id}
            data-testid={`product-card-${product.id}`}
            onClick={() => onProductClick(product)}
            style={{
              cursor: 'pointer',
              overflow: 'hidden',
              borderRadius: 12,
              border: '1px solid var(--color-border)',
              background: 'var(--color-white)',
            }}
          >
            <div
              style={{
                aspectRatio: '4 / 3',
                overflow: 'hidden',
                background: 'var(--color-gray-100)',
              }}
            >
              <img
                src={product.image_url || 'https://placehold.co/400x300/f3f4f6/9ca3af?text=Product'}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={event => {
                  event.currentTarget.src =
                    'https://placehold.co/400x300/f3f4f6/9ca3af?text=Product';
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                {product.subcategory_name}
              </p>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.35,
                  color: 'var(--color-text-primary)',
                }}
              >
                {product.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  ${Number(product.price).toFixed(2)}
                </span>
                {product.original_price &&
                Number(product.original_price) > Number(product.price) ? (
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--color-text-muted)',
                      textDecoration: 'line-through',
                    }}
                  >
                    ${Number(product.original_price).toFixed(2)}
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={event => {
                  event.stopPropagation();
                  onAddToCart(product);
                }}
                style={{
                  marginTop: 6,
                  width: '100%',
                  borderRadius: 10,
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  padding: '10px 12px',
                }}
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
      {products.length === 0 ? (
        <p
          style={{
            borderRadius: 12,
            border: '1px solid var(--color-border)',
            background: 'var(--color-white)',
            padding: 32,
            textAlign: 'center',
            fontSize: 14,
            color: 'var(--color-text-muted)',
          }}
        >
          No products matched your search.
        </p>
      ) : null}
      {hasNextPage || isFetchingNextPage ? (
        <div
          ref={sentinelRef}
          data-testid="load-more-spinner"
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          <div
            className="h-7 w-7 animate-spin rounded-full border-[3px] border-[var(--color-border)] border-t-[var(--color-primary)]"
            aria-label="loading more products"
          />
        </div>
      ) : null}
    </section>
  );
}
