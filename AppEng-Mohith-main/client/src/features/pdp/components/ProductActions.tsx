import { useMemo, useState } from 'react';
import type { ProductOut } from '@/api-sdk';
import bellIcon from '@/assets/icons/bell.svg';
import balanceIcon from '@/assets/icons/balance.svg';
import { Button, StarRating } from '@/design-system/ui/atoms';
import { useCompareStore } from '@/stores/compareStore';
import type { StockStatus } from '../utils/stockStatus';

interface ProductActionsProps {
  product: ProductOut;
  stockStatus: StockStatus;
  onAddToCart: (quantity: number) => void;
  onBuyNow: (quantity: number) => void;
  onShowMaxCompareMessage: () => void;
}

const RAM_OPTIONS = ['8GB', '16GB', '32GB'];
const STORAGE_OPTIONS = ['256GB', '512GB', '1024GB'];
const PROCESSOR_OPTIONS = ['Intel Core i5', 'Intel Core i7', 'Intel Core i9'];

export function ProductActions({
  product,
  stockStatus,
  onAddToCart,
  onBuyNow,
  onShowMaxCompareMessage,
}: ProductActionsProps) {
  const [ram, setRam] = useState(RAM_OPTIONS[1]);
  const [storage, setStorage] = useState(STORAGE_OPTIONS[1]);
  const [processor, setProcessor] = useState(PROCESSOR_OPTIONS[1]);
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');

  const { addToCompare, isInCompare } = useCompareStore();
  const inCompare = isInCompare(product.id);

  const discountedPct = useMemo(() => {
    if (!product.original_price || product.original_price <= product.price) return 0;
    return Math.round(((product.original_price - product.price) / product.original_price) * 100);
  }, [product.original_price, product.price]);

  const maxQty = Math.max(1, stockStatus === 'low-stock' ? product.stock : 10);
  const selectorsDisabled = stockStatus === 'out-of-stock';

  return (
    <section
      data-testid="product-actions"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        borderRadius: 12,
        border: '1px solid var(--color-border)',
        background: 'var(--color-white)',
        padding: 16,
      }}
    >
      <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
        Home &gt; {product.category_name} &gt; {product.subcategory_name}
      </p>
      <h1
        style={{
          fontSize: 48,
          lineHeight: 1.08,
          fontWeight: 800,
          color: 'var(--color-text-primary)',
        }}
      >
        {product.name}
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <StarRating rating={product.rating} showValue showCount count={product.review_count} />
        <span
          style={{
            borderRadius: 9999,
            background: '#dcfce7',
            padding: '2px 10px',
            fontSize: 12,
            fontWeight: 700,
            color: '#15803d',
          }}
        >
          in stock
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <p
          style={{
            fontSize: 40,
            lineHeight: 1.1,
            fontWeight: 800,
            color: 'var(--color-text-primary)',
          }}
        >
          ${product.price.toFixed(2)}
        </p>
        <p
          style={{ fontSize: 16, color: 'var(--color-text-muted)', textDecoration: 'line-through' }}
        >
          ${(product.original_price ?? product.price).toFixed(2)}
        </p>
        {discountedPct > 0 ? (
          <span
            style={{
              borderRadius: 9999,
              background: '#dcfce7',
              padding: '2px 10px',
              fontSize: 12,
              fontWeight: 700,
              color: '#15803d',
            }}
          >
            {discountedPct}% OFF
          </span>
        ) : null}
      </div>

      {stockStatus === 'low-stock' ? (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
          <span className="font-semibold">Low Stock Alert:</span> Only {product.stock} left in
          stock! Order soon.
        </div>
      ) : null}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          opacity: selectorsDisabled ? 0.45 : 1,
          pointerEvents: selectorsDisabled ? 'none' : 'auto',
        }}
      >
        <SelectorRow title="RAM" options={RAM_OPTIONS} selected={ram} onSelect={setRam} />
        <SelectorRow
          title="Storage"
          options={STORAGE_OPTIONS}
          selected={storage}
          onSelect={setStorage}
        />
        <SelectorRow
          title="Processor"
          options={PROCESSOR_OPTIONS}
          selected={processor}
          onSelect={setProcessor}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            value={pinCode}
            onChange={event => setPinCode(event.target.value)}
            placeholder="Enter pincode"
            style={{
              height: 40,
              flex: 1,
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              padding: '0 12px',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <Button type="button" variant="outline" size="sm">
            CHECK
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Quantity</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              style={{
                height: 32,
                width: 32,
                borderRadius: 6,
                border: '1px solid var(--color-border)',
                fontSize: 14,
              }}
            >
              -
            </button>
            <span style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 700 }}>
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(prev => Math.min(maxQty, prev + 1))}
              style={{
                height: 32,
                width: 32,
                borderRadius: 6,
                border: '1px solid var(--color-border)',
                fontSize: 14,
              }}
            >
              +
            </button>
          </div>
        </div>

        {stockStatus !== 'out-of-stock' ? (
          <>
            <Button
              data-testid="add-to-cart-btn"
              type="button"
              fullWidth
              onClick={() => onAddToCart(quantity)}
            >
              Add to Cart
            </Button>
            <Button
              data-testid="buy-now-btn"
              type="button"
              fullWidth
              variant="success"
              onClick={() => onBuyNow(quantity)}
            >
              Buy Now
            </Button>
          </>
        ) : (
          <>
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              Currently Unavailable - This item is temporarily out of stock.
            </p>
            <Button data-testid="notify-me-btn" type="button" fullWidth variant="outline">
              <span className="inline-flex items-center gap-2">
                <img src={bellIcon} alt="bell" className="h-4 w-4" />
                Notify Me When Available
              </span>
            </Button>
          </>
        )}

        <Button
          data-testid="add-to-compare-btn"
          type="button"
          fullWidth
          variant="outline"
          onClick={() => {
            const added = addToCompare(product);
            if (!added && !inCompare) onShowMaxCompareMessage();
          }}
          style={inCompare ? { borderColor: '#22c55e', color: '#16a34a' } : undefined}
        >
          <span className="inline-flex items-center gap-2">
            <img src={balanceIcon} alt="compare" className="h-4 w-4" />
            {inCompare ? 'Added to Compare' : 'Add to Compare'}
          </span>
        </Button>
      </div>
    </section>
  );
}

function SelectorRow({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p
        style={{ marginBottom: 6, fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)' }}
      >
        {title}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            style={{
              borderRadius: 8,
              border: `1px solid ${selected === option ? 'var(--color-primary)' : 'var(--color-border)'}`,
              background: selected === option ? 'var(--color-primary-light)' : 'var(--color-white)',
              color: selected === option ? 'var(--color-primary)' : 'var(--color-text-primary)',
              padding: '6px 10px',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
