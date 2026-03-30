import type { ProductOut, WishlistItemOut } from '@/api-sdk';
import heartFilledIcon from '@/assets/icons/heart-filled.svg';

interface WishlistPageProps {
  items: WishlistItemOut[];
  isLoading: boolean;
  onRemove: (productId: number) => void;
  onAddToCart: (product: ProductOut) => void;
}

export function WishlistPage({ items, isLoading, onRemove, onAddToCart }: WishlistPageProps) {
  if (isLoading) {
    return (
      <section data-testid="wishlist-page" className="space-y-4">
        <div className="h-7 w-44 animate-pulse rounded bg-[var(--color-gray-200)]" />
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
          data-testid="wishlist-grid"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-gray-100)]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section
        data-testid="wishlist-page"
        className="rounded-xl border border-[var(--color-border)] bg-white"
        style={{
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 8,
          padding: 24,
        }}
      >
        <img
          src={heartFilledIcon}
          alt="wishlist"
          style={{ width: 30, height: 30, opacity: 0.35 }}
        />
        <p className="text-lg font-semibold">Your wishlist is empty</p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Start saving items you love to your wishlist.
        </p>
        <a
          data-testid="wishlist-empty-state"
          href="#/plp"
          className="mt-2 inline-block rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          Browse Products
        </a>
      </section>
    );
  }

  return (
    <section data-testid="wishlist-page" className="space-y-4">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
        My Wishlist ({items.length})
      </h2>
      <div
        data-testid="wishlist-grid"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {items.map(item => (
          <article
            key={item.id}
            data-testid={`wishlist-item-${item.product_id}`}
            className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white"
          >
            <div className="relative">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="aspect-[4/3] w-full object-cover"
              />
              <button
                data-testid={`remove-from-wishlist-${item.product_id}`}
                type="button"
                onClick={() => onRemove(item.product_id)}
                className="absolute right-2 top-2 rounded-full bg-white p-1"
              >
                <img src={heartFilledIcon} alt="remove" className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2 p-3">
              <p className="line-clamp-2 text-sm font-semibold">{item.product.name}</p>
              <p className="text-sm font-bold">${item.product.price.toFixed(2)}</p>
              <button
                type="button"
                onClick={() => onAddToCart(item.product)}
                className="w-full rounded-md bg-[var(--color-primary)] py-2 text-xs font-semibold text-white"
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
