import { useRef } from 'react';
import type { ProductOut } from '@/api-sdk';
import { ProductCard } from '@/design-system/ui/molecules';

export function RecentlyViewed({ products }: { products: ProductOut[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  return (
    <section data-testid="recently-viewed" style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 28, fontWeight: 800 }}>Recently Viewed</h3>
        <a href="#">View All</a>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
        <button onClick={() => rowRef.current?.scrollBy({ left: -280, behavior: 'smooth' })}>
          ←
        </button>
        <button onClick={() => rowRef.current?.scrollBy({ left: 280, behavior: 'smooth' })}>
          →
        </button>
      </div>
      <div
        ref={rowRef}
        style={{ display: 'flex', gap: 12, overflowX: 'auto', marginTop: 10, paddingBottom: 8 }}
      >
        {products.map(p => (
          <div key={p.id} style={{ minWidth: 220 }}>
            <ProductCard
              product={p}
              size="sm"
              onClick={item => (window.location.hash = `#/pdp/${item.id}`)}
              data-testid={`product-card-${p.id}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
