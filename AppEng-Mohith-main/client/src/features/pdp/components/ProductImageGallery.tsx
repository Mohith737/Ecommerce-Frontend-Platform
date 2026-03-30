import { useMemo, useState } from 'react';
import boxIcon from '@/assets/icons/box.svg';
import type { StockStatus } from '../utils/stockStatus';

interface ProductImageGalleryProps {
  images: string[];
  stockStatus: StockStatus;
  productName: string;
}

export function ProductImageGallery({
  images,
  stockStatus,
  productName,
}: ProductImageGalleryProps) {
  const [active, setActive] = useState(0);
  const fallbackImage = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&q=80';
  const padded = useMemo(() => {
    const base = images.length > 0 ? [...images] : [fallbackImage];
    while (base.length < 5) base.push(base[0]);
    return base.slice(0, 5);
  }, [images]);

  return (
    <section
      data-testid="product-image-gallery"
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div
        style={{
          overflow: 'hidden',
          borderRadius: 12,
          border: '1px solid var(--color-border)',
          background: 'var(--color-white)',
          padding: 8,
        }}
      >
        {stockStatus === 'out-of-stock' ? (
          <div
            style={{
              minHeight: 340,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              background: 'var(--color-gray-100)',
              textAlign: 'center',
            }}
          >
            <img src={boxIcon} alt="Out of stock" style={{ width: 64, height: 64, opacity: 0.7 }} />
            <p
              style={{
                marginTop: 12,
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
              }}
            >
              Out of Stock
            </p>
            <p
              style={{
                marginTop: 4,
                maxWidth: 360,
                fontSize: 14,
                color: 'var(--color-text-muted)',
              }}
            >
              This item is currently not available. Check back soon.
            </p>
          </div>
        ) : (
          <img
            src={padded[active]}
            alt={productName}
            style={{ width: '100%', borderRadius: 10, objectFit: 'cover', aspectRatio: '1 / 1' }}
          />
        )}
      </div>

      {stockStatus !== 'out-of-stock' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 8 }}>
          {padded.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              style={{
                overflow: 'hidden',
                borderRadius: 8,
                border: `1px solid ${active === index ? 'var(--color-primary)' : 'var(--color-border)'}`,
                padding: 2,
              }}
            >
              <img
                src={image}
                alt={`${productName}-${index}`}
                style={{ width: '100%', objectFit: 'cover', aspectRatio: '4 / 3' }}
                onError={event => {
                  event.currentTarget.src = fallbackImage;
                }}
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
