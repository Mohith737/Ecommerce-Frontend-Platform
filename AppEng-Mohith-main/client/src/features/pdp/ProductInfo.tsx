import { useState } from 'react';
import type { ProductOut } from '@/api-sdk';
import { Badge, Button, StarRating } from '@/design-system/ui/atoms';

interface ProductInfoProps {
  product: ProductOut;
  onAddToCart: () => void;
  onBuyNow: () => void;
  isGuest: boolean;
}

export function ProductInfo({ product, onAddToCart, onBuyNow, isGuest }: ProductInfoProps) {
  const [showGuestNotice, setShowGuestNotice] = useState(false);

  const guardAction = (action: () => void) => {
    if (isGuest) {
      setShowGuestNotice(true);
      return;
    }
    action();
  };

  return (
    <div data-testid="product-info" className="space-y-3">
      <div className="flex gap-2">
        <Badge label="In stock" variant={product.stock > 0 ? 'green' : 'gray'} />
        <Badge label="Out of stock" variant={product.stock > 0 ? 'gray' : 'red'} />
        <Badge label="Live Stock" variant="purple" />
      </div>
      <p style={{ color: 'var(--color-text-muted)' }}>
        Home &gt; {product.category_name} &gt; {product.subcategory_name} &gt; {product.name}
      </p>
      <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)' }}>
        {product.name}
      </h1>
      <StarRating rating={product.rating} showValue showCount count={product.review_count} />
      <div className="flex items-center gap-2">
        <strong style={{ fontSize: 'var(--text-3xl)' }}>${product.price.toFixed(2)}</strong>
        <span style={{ color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
          ${(product.original_price ?? product.price).toFixed(2)}
        </span>
        <Badge label="17% OFF" variant="red" />
      </div>
      <p style={{ color: 'var(--color-success)' }}>In Stock • Ships in 2–3 business days</p>
      <div className="space-y-2">
        <Button
          data-testid="add-to-cart-btn"
          fullWidth
          size="lg"
          onClick={() => guardAction(onAddToCart)}
        >
          🛒 Add to Cart
        </Button>
        <Button
          data-testid="buy-now-btn"
          fullWidth
          size="lg"
          variant="success"
          onClick={() => guardAction(onBuyNow)}
        >
          ⚡ Buy Now
        </Button>
        <Button fullWidth size="lg" variant="outline">
          Add to Compare
        </Button>
      </div>
      {showGuestNotice ? (
        <div
          className="p-3"
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-white)',
          }}
        >
          Please sign in to add items to your cart.{' '}
          <a href="#/sign-in" style={{ color: 'var(--color-primary)' }}>
            Sign In →
          </a>
        </div>
      ) : null}
    </div>
  );
}
