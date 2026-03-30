import { useState } from 'react';
import type { ReviewOut } from '@/api-sdk';
import { Badge, StarRating } from '@/design-system/ui/atoms';

export function ReviewsSection({
  reviews,
  averageRating,
}: {
  reviews: ReviewOut[];
  averageRating: number;
}) {
  const [tab, setTab] = useState<'reviews' | 'faqs'>('reviews');
  const breakdown = [65, 20, 10, 3, 2];

  return (
    <section data-testid="reviews-section" style={{ marginTop: 8 }}>
      <div
        style={{
          display: 'flex',
          gap: 20,
          marginBottom: 14,
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <button
          onClick={() => setTab('reviews')}
          style={{
            padding: '8px 2px',
            borderBottom:
              tab === 'reviews' ? '2px solid var(--color-primary)' : '2px solid transparent',
            fontWeight: 700,
          }}
        >
          Reviews
        </button>
        <button
          onClick={() => setTab('faqs')}
          style={{
            padding: '8px 2px',
            borderBottom:
              tab === 'faqs' ? '2px solid var(--color-primary)' : '2px solid transparent',
            fontWeight: 700,
          }}
        >
          FAQs
        </button>
      </div>
      {tab === 'faqs' ? (
        <p style={{ color: 'var(--color-text-secondary)' }}>FAQs will be available soon.</p>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              padding: 16,
              background: 'var(--color-white)',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
            }}
          >
            <div>
              <p
                style={{
                  color: 'var(--color-primary)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-bold)',
                }}
              >
                {averageRating.toFixed(1)}
              </p>
              <StarRating rating={averageRating} size={20} />
              <p>Based on {reviews.length} reviews</p>
            </div>
            <div>
              {breakdown.map((pct, idx) => (
                <div key={pct} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{5 - idx} star</span>
                  <div style={{ flex: 1, background: 'var(--color-gray-200)', borderRadius: 9999 }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        background: 'var(--color-warning)',
                        height: '8px',
                        borderRadius: 'var(--radius-full)',
                      }}
                    />
                  </div>
                  <span>{pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reviews.map(review => (
              <article
                key={review.id}
                style={{
                  padding: 16,
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-white)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong>{review.reviewer_name}</strong>
                  <Badge label="Verified Purchase" variant="green" />
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
                  {new Date(review.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <StarRating rating={review.rating} />
                <p style={{ fontWeight: 'var(--font-semibold)' }}>{review.product_name}</p>
                <p>{review.review_text}</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
                  Helpful (234)
                </p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
