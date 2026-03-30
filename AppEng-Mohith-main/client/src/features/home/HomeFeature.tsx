import { useEffect, useMemo, useRef, useState } from 'react';
import {
  addToCart,
  getCategories,
  getDemoProducts,
  type CategoryOut,
  type ProductOut,
} from '@/api-sdk';
import { Button } from '@/design-system/ui/atoms';
import { ErrorState, PageSkeleton, ProductCard, useToast } from '@/design-system/ui/molecules';
import { AppLayout } from '@/layouts';
import { useAuth } from '@/providers/AuthProvider';

const HERO_SLIDES = [
  {
    title: 'Electronics',
    subtitle: 'Get ready for summer with our exclusive collection of styles.',
    label: 'Featured Category',
    bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1440&q=80',
  },
  {
    title: 'SMART WEARABLE.',
    subtitle: 'UP TO 80% OFF',
    label: 'Best Deal Online on smart watches',
    bg: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
  },
  {
    title: 'Premium Essentials',
    subtitle: 'Discover curated picks for modern living.',
    label: 'New Arrivals',
    bg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1440&q=80',
  },
];

export function HomeFeature() {
  const { isAuthenticated, isGuest } = useAuth();
  const { showToast } = useToast();
  const [activeSlide, setActiveSlide] = useState(0);
  const [products, setProducts] = useState<ProductOut[]>([]);
  const [categories, setCategories] = useState<CategoryOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [homeError, setHomeError] = useState(false);
  const [wearableImageSrc, setWearableImageSrc] = useState(
    'https://pngimg.com/d/watches_PNG9853.png'
  );
  const trendingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const [demo, categoryResponse] = await Promise.all([getDemoProducts(), getCategories()]);
        setProducts(demo);
        setCategories(categoryResponse);
        setHomeError(false);
      } catch {
        setProducts([]);
        setCategories([]);
        setHomeError(true);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [isAuthenticated]);

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);
  const trendingProducts = useMemo(
    () => (products.length > 4 ? products.slice(4, 8) : products),
    [products]
  );

  const handleGuestAddToCart = (product: ProductOut) => {
    if (isGuest || !isAuthenticated) {
      showToast({
        message: 'Please sign in to add items to your cart.',
        type: 'info',
        action: {
          label: 'Sign In',
          onClick: () => {
            window.location.hash = '#/sign-in';
          },
        },
      });
      return;
    }

    void addToCart({ product_id: product.id, quantity: 1 });
  };

  if (loading) {
    return <PageSkeleton />;
  }

  if (homeError) {
    return (
      <ErrorState
        fullPage
        message="Failed to load home page content."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <AppLayout showSidebar showAnnouncement>
      <div
        style={{ padding: 'var(--space-6) var(--space-8)', maxWidth: '1440px', margin: '0 auto' }}
        data-testid="home-page"
      >
        <section
          data-testid="hero-banner"
          style={{
            position: 'relative',
            height: '420px',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            marginBottom: 'var(--space-6)',
          }}
        >
          <div
            style={{
              display: 'flex',
              height: '100%',
              transform: `translateX(-${activeSlide * 100}%)`,
              transition: 'transform 0.5s ease',
            }}
          >
            {HERO_SLIDES.map(slide => {
              const usesGradient = slide.bg.startsWith('linear-gradient');
              return (
                <div
                  key={slide.title}
                  style={{ minWidth: '100%', height: '100%', position: 'relative' }}
                >
                  {usesGradient ? (
                    <div style={{ width: '100%', height: '100%', background: slide.bg }} />
                  ) : (
                    <img
                      src={slide.bg}
                      alt={slide.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
                  <div
                    style={{
                      position: 'absolute',
                      left: 'var(--space-8)',
                      bottom: 'var(--space-8)',
                      color: 'var(--color-white)',
                      maxWidth: '520px',
                    }}
                  >
                    <p
                      style={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontSize: 'var(--text-xs)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {slide.label}
                    </p>
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-4xl)',
                        fontWeight: 'var(--font-bold)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {slide.title}
                    </h2>
                    <p style={{ color: 'var(--color-gray-100)', marginBottom: 'var(--space-4)' }}>
                      {slide.subtitle}
                    </p>
                    <Button>Explore Electronics →</Button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() =>
              setActiveSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              position: 'absolute',
              left: 'var(--space-4)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.8)',
            }}
          >
            ←
          </button>
          <button
            onClick={() => setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length)}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              position: 'absolute',
              right: 'var(--space-4)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.8)',
            }}
          >
            →
          </button>

          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 'var(--space-4)',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 'var(--space-2)',
            }}
          >
            {HERO_SLIDES.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => setActiveSlide(index)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    index === activeSlide ? 'var(--color-white)' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>
        </section>

        <section data-testid="featured-products" style={{ marginBottom: 'var(--space-8)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)',
            }}
          >
            <h3 style={{ fontWeight: 'var(--font-bold)', fontSize: '22px' }}>Featured Products</h3>
            <a
              href="#/plp"
              style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)' }}
            >
              View All
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`featured-skeleton-${i}`}
                    style={{
                      background: 'var(--color-gray-200)',
                      borderRadius: 'var(--radius-lg)',
                      height: '280px',
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                ))
              : featuredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={item => {
                      window.location.hash = `#/pdp/${item.id}`;
                    }}
                    onAddToCart={handleGuestAddToCart}
                    data-testid={`product-card-${product.id}`}
                  />
                ))}
          </div>
          {!loading && featuredProducts.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              No featured products found.
            </p>
          ) : null}
        </section>

        <section
          style={{
            marginBottom: 'var(--space-8)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1f2548 0%, #4338ca 100%)',
            minHeight: '160px',
            color: 'var(--color-white)',
            padding: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-6)',
          }}
        >
          <div>
            <p style={{ fontSize: 'var(--text-sm)' }}>Best Deal Online on smart watches</p>
            <h3
              style={{
                fontSize: 'var(--text-3xl)',
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--font-bold)',
              }}
            >
              SMART WEARABLE.
            </h3>
            <p>UP TO 80% OFF</p>
          </div>
          <img
            src={wearableImageSrc}
            alt="Smart wearable watch"
            style={{
              width: '190px',
              maxWidth: '32%',
              height: 'auto',
              objectFit: 'contain',
            }}
            onError={() => {
              if (wearableImageSrc.includes('pngimg.com')) {
                setWearableImageSrc(
                  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'
                );
              }
            }}
          />
        </section>

        <section data-testid="shop-by-category" style={{ marginBottom: 'var(--space-8)' }}>
          <h3
            style={{
              fontWeight: 'var(--font-bold)',
              fontSize: '22px',
              marginBottom: 'var(--space-4)',
            }}
          >
            Shop by Category
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {categories.slice(0, 6).map(apiCategory => {
              const name = apiCategory.name;
              const href = `#/plp?category_id=${apiCategory.id}`;
              return (
                <a
                  key={name}
                  href={href}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    aspectRatio: '3/2',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={apiCategory.image_url}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 'var(--space-3)',
                      bottom: 'var(--space-3)',
                      color: 'var(--color-white)',
                    }}
                  >
                    <strong style={{ fontSize: 'var(--text-lg)' }}>{name}</strong>
                    <p style={{ fontSize: 'var(--text-xs)' }}>Explore now</p>
                  </div>
                </a>
              );
            })}
          </div>
          {categories.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">No categories available.</p>
          ) : null}
        </section>

        <section
          style={{
            marginBottom: 'var(--space-8)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1a3a1a, #2d5a27)',
            minHeight: '120px',
            color: 'var(--color-white)',
            padding: 'var(--space-6)',
          }}
        >
          <h3>We're on a Mission To Clean Up the Industry.</h3>
          <p style={{ fontStyle: 'italic' }}>Read about our vision for a better impact report.</p>
          <Button variant="outline">LEARN MORE</Button>
        </section>

        <section data-testid="trending-now" style={{ marginBottom: 'var(--space-8)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)',
            }}
          >
            <h3 style={{ fontWeight: 'var(--font-bold)', fontSize: '22px' }}>Trending Now</h3>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button
                onClick={() => trendingRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
              >
                ←
              </button>
              <button
                onClick={() => trendingRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
              >
                →
              </button>
            </div>
          </div>
          <div ref={trendingRef} style={{ display: 'flex', gap: '16px', overflowX: 'hidden' }}>
            {trendingProducts.map(product => (
              <div key={`trending-${product.id}`} style={{ minWidth: '220px' }}>
                <ProductCard
                  product={product}
                  size="md"
                  onClick={item => {
                    window.location.hash = `#/pdp/${item.id}`;
                  }}
                  onAddToCart={handleGuestAddToCart}
                  data-testid={`product-card-${product.id}`}
                />
              </div>
            ))}
          </div>
        </section>

        {isAuthenticated ? (
          <section data-testid="quick-access" style={{ marginBottom: 'var(--space-8)' }}>
            <h3
              style={{
                fontWeight: 'var(--font-bold)',
                fontSize: '22px',
                marginBottom: 'var(--space-4)',
              }}
            >
              Quick Access
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div
                style={{
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                }}
              >
                <h4>Your Orders</h4>
                <p style={{ marginTop: 6, color: 'var(--color-text-secondary)' }}>
                  View all orders →
                </p>
              </div>
              <div
                style={{
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                }}
              >
                <h4>Recently Viewed</h4>
                <p>Professional Camera $1,299.99</p>
                <p>Travel Backpack $129.00</p>
                <p>Gaming Console $499.00</p>
                <a href="#">View history →</a>
              </div>
              <div
                style={{
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                }}
              >
                <h4>Cart Items</h4>
                <strong>Total: $0.00</strong>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </AppLayout>
  );
}
