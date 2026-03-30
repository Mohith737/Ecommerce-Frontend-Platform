import type { ProductOut } from '@/api-sdk';
import arrowRightIcon from '@/assets/icons/arrow-right.svg';
import { ProductCard } from '@/design-system/ui/molecules';

interface FeaturedProductsSectionProps {
  products: ProductOut[];
  isLoading: boolean;
  categoryName: string;
  onProductClick: (product: ProductOut) => void;
  onAddToCart: (product: ProductOut) => void;
}

export function FeaturedProductsSection({
  products,
  isLoading,
  categoryName,
  onProductClick,
  onAddToCart,
}: FeaturedProductsSectionProps) {
  return (
    <section data-testid="featured-products-section" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Featured Products</h2>
        <button
          type="button"
          className="inline-flex items-center gap-2 border-0 bg-transparent p-0 text-sm font-semibold text-[var(--color-primary)]"
        >
          View All {categoryName}
          <img src={arrowRightIcon} alt="arrow" className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`category-skeleton-${index}`}
                className="h-72 animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-gray-100)]"
              />
            ))
          : products.map(product => (
              <ProductCard
                key={product.id}
                data-testid={`product-card-${product.id}`}
                product={product}
                onClick={onProductClick}
                onAddToCart={onAddToCart}
              />
            ))}
      </div>
    </section>
  );
}
