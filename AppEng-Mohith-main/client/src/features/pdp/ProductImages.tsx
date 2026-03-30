import { useMemo, useState } from 'react';

export function ProductImages({ images }: { images: string[] }) {
  const padded = useMemo(() => {
    const base = [...images];
    while (base.length < 5) base.push(images[0] ?? '');
    return base.slice(0, 5);
  }, [images]);
  const [active, setActive] = useState(0);

  return (
    <div data-testid="product-images">
      <div
        className="overflow-hidden"
        style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-gray-100)' }}
      >
        <img
          src={padded[active]}
          alt="product"
          className="w-full"
          style={{ transition: 'transform var(--duration-base) var(--ease-default)' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {padded.map((image, idx) => (
          <button
            key={`${image}-${idx}`}
            onClick={() => setActive(idx)}
            style={{
              border:
                idx === active ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <img src={image} alt={`thumb-${idx}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
