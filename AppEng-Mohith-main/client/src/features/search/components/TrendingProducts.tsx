import type { ProductOut } from '@/api-sdk';
import trendingIcon from '@/assets/icons/trending.svg';

interface TrendingProductsProps {
  products: ProductOut[];
  isLoading: boolean;
  onProductClick: (product: ProductOut) => void;
}

export function TrendingProducts({ products, isLoading, onProductClick }: TrendingProductsProps) {
  return (
    <section data-testid="trending-products" style={{ background: 'transparent', padding: 0 }}>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--color-text-primary)]">
        <img src={trendingIcon} alt="trending" className="h-4 w-4" />
        Trending Now
      </h3>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={`trend-skeleton-${index}`} className="animate-pulse">
                <div className="aspect-square rounded-lg bg-[var(--color-gray-200)]" />
                <div className="mt-2 h-3 rounded bg-[var(--color-gray-200)]" />
                <div className="mt-1 h-3 w-2/3 rounded bg-[var(--color-gray-200)]" />
              </div>
            ))
          : products.slice(0, 4).map(product => (
              <button
                key={`trend-${product.id}`}
                type="button"
                onClick={() => onProductClick(product)}
                className="text-left"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <p className="mt-2 line-clamp-2 text-sm font-medium text-[var(--color-text-primary)]">
                  {product.name}
                </p>
                <p className="mt-1 text-sm font-bold text-[var(--color-primary)]">
                  ${product.price.toFixed(2)}
                </p>
              </button>
            ))}
      </div>
    </section>
  );
}
