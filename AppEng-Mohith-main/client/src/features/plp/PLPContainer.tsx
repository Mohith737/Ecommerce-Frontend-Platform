import { useMemo, useState } from 'react';
import { addToCart, type ProductOut } from '@/api-sdk';
import { CardSkeleton, ErrorState, ProductCard, useToast } from '@/design-system/ui/molecules';
import { AppLayout } from '@/layouts';
import { useAuth } from '@/providers/AuthProvider';
import { FilterSidebar, type ActiveFilters } from './FilterSidebar';
import { PRODUCTS_PER_PAGE, useProductsInfiniteQuery } from './hooks/useProductsInfiniteQuery';
import { SortBar, type SortOption } from './SortBar';

interface PLPContainerProps {
  params: Record<string, string>;
}

function filterByCheckboxes(items: ProductOut[], filters: ActiveFilters): ProductOut[] {
  let next = [...items];

  if (filters.brands.length) {
    next = next.filter(item => filters.brands.includes(item.brand));
  }

  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) {
    next = next.filter(
      item => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
    );
  }

  return next;
}

function sortProducts(items: ProductOut[], sort: SortOption): ProductOut[] {
  const next = [...items];
  next.sort((a, b) => {
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'popularity') return b.review_count - a.review_count;
    if (sort === 'rating') return b.rating - a.rating;
    return a.price - b.price;
  });
  return next;
}

export function PLPContainer({ params }: PLPContainerProps) {
  const { isAuthenticated, isGuest } = useAuth();
  const { showToast } = useToast();
  const [filters, setFilters] = useState<ActiveFilters>({
    brands: [],
    ram: [],
    storage: [],
    processors: [],
    priceRange: [0, 5000],
  });
  const [sort, setSort] = useState<SortOption>('price_asc');
  const [currentPage, setCurrentPage] = useState(1);
  const safePage = Math.max(1, currentPage);

  const categoryId = params.category_id ? Number(params.category_id) : undefined;
  const subcategoryId = params.subcategory_id ? Number(params.subcategory_id) : undefined;
  const query = useProductsInfiniteQuery({
    query: params.q,
    categoryId,
    subcategoryId,
    priceMin: filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
    priceMax: filters.priceRange[1] < 5000 ? filters.priceRange[1] : undefined,
    page: safePage,
  });

  const handleAddToCart = async (product: ProductOut) => {
    if (isGuest || !isAuthenticated) {
      showToast({
        message: 'Please sign in to add items to your cart.',
        type: 'info',
        action: {
          label: 'Sign In',
          onClick: () => {
            window.location.hash = '#/sign-in';
          },
        },
      });
      return;
    }

    try {
      await addToCart({ product_id: product.id, quantity: 1 });
      showToast({ message: 'Added to cart', type: 'success' });
    } catch {
      showToast({ message: 'Unable to add to cart', type: 'error' });
    }
  };

  const title = 'Laptops';
  const displayedProducts = useMemo(() => {
    const apiProducts = query.data?.items ?? [];
    const filtered = filterByCheckboxes(apiProducts, filters);
    return sortProducts(filtered, sort);
  }, [filters, query.data?.items, sort]);

  const isLoading = query.isLoading && !query.data;
  const hasError = query.isError;
  const totalCount = query.data?.total ?? displayedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PRODUCTS_PER_PAGE));
  const effectivePage = Math.min(safePage, totalPages);
  const pageButtons = useMemo(() => {
    const start = Math.max(1, effectivePage - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [effectivePage, totalPages]);

  return (
    <AppLayout showSidebar={false}>
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8" data-testid="plp-page">
        <nav
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <a href="#/home" style={{ color: 'var(--color-text-muted)' }}>
            Home
          </a>
          <span>›</span>
          <a href="#/plp" style={{ color: 'var(--color-text-muted)' }}>
            Electronics
          </a>
          <span>›</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--font-medium)' }}>
            Laptops
          </span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <aside
            data-testid="filter-sidebar"
            style={{
              position: 'sticky',
              top: 'calc(var(--navbar-height) + 16px)',
              width: 220,
              minWidth: 220,
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'var(--color-white)',
              padding: 20,
              boxShadow: 'var(--shadow-sm)',
              alignSelf: 'flex-start',
            }}
          >
            <FilterSidebar
              filters={filters}
              onFilterChange={next => {
                setFilters(next);
                setCurrentPage(1);
              }}
              maxPrice={5000}
            />
          </aside>

          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-4)',
              }}
            >
              <h1
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {title}
              </h1>
            </div>

            <SortBar sort={sort} onSortChange={setSort} resultCount={displayedProducts.length} />

            {hasError ? (
              <div className="mt-4">
                <ErrorState message="Failed to load products." onRetry={() => query.refetch()} />
              </div>
            ) : null}

            <div
              data-testid="product-grid"
              style={{
                marginTop: 16,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 16,
              }}
            >
              {isLoading
                ? Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)
                : displayedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      data-testid={`product-card-${product.id}`}
                      product={product}
                      onClick={() => {
                        window.location.hash = `#/pdp/${product.id}`;
                      }}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
            </div>

            {!isLoading && displayedProducts.length === 0 ? (
              <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-white p-8 text-center text-sm text-[var(--color-text-muted)]">
                No products found for the selected filters.
              </div>
            ) : null}

            <div
              className="mt-8 flex items-center justify-center gap-2"
              data-testid="pagination-controls"
            >
              <button
                type="button"
                className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm disabled:opacity-40"
                disabled={effectivePage === 1 || query.isFetching}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                Prev
              </button>
              {pageButtons.map(page => (
                <button
                  key={page}
                  type="button"
                  className={`min-w-9 rounded-md border px-3 py-2 text-sm ${
                    page === effectivePage
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                      : 'border-[var(--color-border)]'
                  }`}
                  onClick={() => setCurrentPage(page)}
                  disabled={query.isFetching}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm disabled:opacity-40"
                disabled={effectivePage === totalPages || query.isFetching}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
