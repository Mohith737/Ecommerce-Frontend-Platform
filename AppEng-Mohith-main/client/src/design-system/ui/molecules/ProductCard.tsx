import { useState } from 'react';
import type { ProductOut } from '@/api-sdk/types';
import { StarRating } from '../atoms/StarRating';

interface ProductCardProps {
  product: ProductOut;
  onAddToCart?: (product: ProductOut) => void;
  onWishlistToggle?: (product: ProductOut, wishlisted: boolean) => void;
  onClick?: (product: ProductOut) => void;
  isWishlisted?: boolean;
  size?: 'sm' | 'md';
  'data-testid'?: string;
}

function getBadge(product: ProductOut): string | null {
  if (product.stock === 0) return null;
  if (product.review_count > 1000) return 'Best Seller';
  if (product.rating >= 4.8) return 'Top Rated';
  if (product.original_price && product.original_price > product.price) {
    const discount = Math.round(
      ((product.original_price - product.price) / product.original_price) * 100
    );
    if (discount >= 20) return 'Sale';
  }
  return null;
}

const BADGE_STYLES: Record<string, { background: string; color: string }> = {
  'Best Seller': { background: '#dbeafe', color: '#1d4ed8' },
  'Top Rated': { background: '#fef3c7', color: '#d97706' },
  Sale: { background: '#fee2e2', color: '#dc2626' },
  New: { background: '#dcfce7', color: '#16a34a' },
  Limited: { background: '#fce7f3', color: '#be185d' },
};

export function ProductCard({
  product,
  onAddToCart,
  onWishlistToggle,
  onClick,
  isWishlisted = false,
  size = 'md',
  'data-testid': testId,
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const badge = getBadge(product);
  const discountPct =
    product.original_price && product.original_price > product.price
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : null;

  const imageUrl =
    imgError || !product.image_url
      ? `https://placehold.co/400x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name.substring(0, 10))}`
      : product.image_url;

  return (
    <div
      data-testid={testId}
      onClick={() => onClick?.(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition:
          'transform var(--duration-base) var(--ease-default), box-shadow var(--duration-base) var(--ease-default)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/3',
          overflow: 'hidden',
          background: 'var(--color-gray-50)',
          flexShrink: 0,
        }}
      >
        {badge && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 2,
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-bold)',
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              ...(BADGE_STYLES[badge] ?? {
                background: 'var(--color-gray-100)',
                color: 'var(--color-gray-600)',
              }),
            }}
          >
            {badge}
          </span>
        )}

        {product.stock === 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              background: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                background: 'var(--color-gray-700)',
                color: 'var(--color-white)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
              }}
            >
              Out of Stock
            </span>
          </div>
        )}

        <img
          src={imageUrl}
          alt={product.name}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--duration-slow) var(--ease-default)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            opacity: hovered ? 1 : 0,
            transition: 'opacity var(--duration-fast) var(--ease-default)',
          }}
        >
          <button
            onClick={e => {
              e.stopPropagation();
              setWishlisted(!wishlisted);
              onWishlistToggle?.(product, !wishlisted);
            }}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--color-white)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={wishlisted ? '#ef4444' : 'none'}
              stroke={wishlisted ? '#ef4444' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          {onAddToCart && (
            <button
              onClick={e => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--color-white)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          padding: size === 'sm' ? 'var(--space-3)' : 'var(--space-4)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
          {product.subcategory_name || product.category_name}
        </p>

        <h3
          style={{
            fontSize: size === 'sm' ? 'var(--text-sm)' : 'var(--text-base)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 'var(--leading-snug)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </h3>

        <StarRating
          rating={product.rating ?? 0}
          showValue
          showCount
          count={product.review_count ?? 0}
          size={12}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            marginTop: 'auto',
          }}
        >
          <span
            style={{
              fontSize: size === 'sm' ? 'var(--text-lg)' : 'var(--text-xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-text-primary)',
            }}
          >
            ${Number(product.price).toFixed(2)}
          </span>
          {product.original_price && Number(product.original_price) > Number(product.price) && (
            <>
              <span
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'line-through',
                }}
              >
                ${Number(product.original_price).toFixed(2)}
              </span>
              {discountPct && discountPct > 0 && (
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-error)',
                  }}
                >
                  {discountPct}% off
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
