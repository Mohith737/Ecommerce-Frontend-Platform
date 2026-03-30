import type { ProductOut } from '@/api-sdk';
import { Button } from '@/design-system/ui/atoms';
import { useToast } from '@/design-system/ui/molecules';
import { useAuth } from '@/providers/AuthProvider';
import { useCartStore } from '@/stores/cartStore';
import { useCompareStore } from '@/stores/compareStore';
import { navigate } from '@/utils/navigate';

const DEMO_COMPARE_PRODUCTS: ProductOut[] = [
  {
    id: 101,
    name: 'Dell XPS 15 Professional',
    price: 1499.99,
    original_price: 1799.99,
    rating: 4.7,
    review_count: 344,
    image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&q=80',
    stock: 12,
    brand: 'Dell',
    subcategory_name: 'Laptop',
    category_name: 'Electronics',
    description: 'Laptop',
    subcategory_id: 3,
  },
  {
    id: 103,
    name: 'ASUS ROG Strix G15 Gaming',
    price: 1899.99,
    original_price: 2699.99,
    rating: 4.8,
    review_count: 290,
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&q=80',
    stock: 6,
    brand: 'ASUS',
    subcategory_name: 'Laptop',
    category_name: 'Electronics',
    description: 'Laptop',
    subcategory_id: 3,
  },
  {
    id: 200,
    name: 'MacBook Pro 14" M3',
    price: 2199.99,
    original_price: 2499.99,
    rating: 4.8,
    review_count: 789,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80',
    stock: 4,
    brand: 'Apple',
    subcategory_name: 'Laptop',
    category_name: 'Electronics',
    description: '',
    subcategory_id: 3,
  },
];

const SPEC_ROWS = [
  { label: 'Processor', key: 'processor' },
  { label: 'RAM', key: 'ram' },
  { label: 'Storage', key: 'storage' },
  { label: 'Display', key: 'display' },
  { label: 'Battery Life', key: 'battery' },
  { label: 'Graphics', key: 'graphics' },
  { label: 'Weight', key: 'weight' },
  { label: 'Warranty', key: 'warranty' },
] as const;

const PRODUCT_SPECS: Record<number, Record<(typeof SPEC_ROWS)[number]['key'], string>> = {
  101: {
    processor: 'Intel Core i7 11th Gen',
    ram: '16GB DDR5',
    storage: '512GB NVMe SSD',
    display: '15.6" FHD (1920x1080)',
    battery: 'Up to 12 hours',
    graphics: 'Intel Iris Xe',
    weight: '1.63 kg',
    warranty: '2 years',
  },
  103: {
    processor: 'AMD Ryzen 9 5900HX',
    ram: '32GB DDR4',
    storage: '1TB NVMe SSD',
    display: '15.6" QHD (2560x1440) 165Hz',
    battery: 'Up to 8 hours',
    graphics: 'NVIDIA RTX 3070 8GB',
    weight: '2.3 kg',
    warranty: '1 year',
  },
  200: {
    processor: 'Apple M3 Chip',
    ram: '16GB Unified Memory',
    storage: '512GB SSD',
    display: '14.2" Liquid Retina XDR',
    battery: 'Up to 18 hours',
    graphics: 'Integrated 10-core GPU',
    weight: '1.6 kg',
    warranty: '1 year (AppleCare available)',
  },
};

export function CompareTable() {
  const { items, clearCompare, removeFromCompare } = useCompareStore();
  const products = (items.length ? items : DEMO_COMPARE_PRODUCTS).slice(0, 3);
  const addItem = useCartStore(state => state.addItem);
  const { isAuthenticated, isGuest } = useAuth();
  const { showToast } = useToast();

  const handleAddToCart = (product: ProductOut) => {
    if (!isAuthenticated || isGuest) {
      showToast({
        message: 'Please sign in to add items to your cart.',
        type: 'info',
        action: { label: 'Sign In', onClick: () => navigate('/sign-in') },
      });
      return;
    }

    addItem(product, 1);
    showToast({ message: 'Added to cart', type: 'success' });
  };

  const getSpec = (productId: number, key: (typeof SPEC_ROWS)[number]['key']) =>
    PRODUCT_SPECS[productId]?.[key] ?? '—';

  const isRowDifferent = (key: (typeof SPEC_ROWS)[number]['key']) => {
    const values = products.map(product => getSpec(product.id, key));
    return new Set(values).size > 1;
  };

  return (
    <section
      data-testid="compare-table"
      style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20 }}
    >
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 42, lineHeight: 1.1, fontWeight: 800, color: '#111827' }}>
          Compare Laptops
        </h1>
        <p style={{ marginTop: 6, fontSize: 24, color: '#6B7280' }}>
          Side-by-side comparison to help you make the right choice
        </p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 860 }}>
          <div
            style={{
              display: 'flex',
              border: '1px solid #E5E7EB',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: 144,
                minWidth: 144,
                background: '#F9FAFB',
                borderRight: '1px solid #E5E7EB',
              }}
            />
            {products.map((product, idx) => {
              const original = product.original_price ?? product.price;
              const hasDiscount = original > product.price;
              const discount = hasDiscount
                ? Math.round(((original - product.price) / original) * 100)
                : null;

              return (
                <article
                  key={product.id}
                  style={{
                    position: 'relative',
                    flex: 1,
                    minWidth: 180,
                    maxWidth: 320,
                    padding: 16,
                    textAlign: 'center',
                    borderRight: idx < products.length - 1 ? '1px solid #E5E7EB' : undefined,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => removeFromCompare(product.id)}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: 24,
                      height: 24,
                      borderRadius: 9999,
                      background: '#F3F4F6',
                      color: '#6B7280',
                    }}
                    aria-label={`Remove ${product.name} from compare`}
                  >
                    ×
                  </button>

                  <div
                    style={{
                      width: 144,
                      height: 144,
                      overflow: 'hidden',
                      borderRadius: 8,
                      margin: '0 auto',
                      background: '#F3F4F6',
                    }}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <h3 style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#111827' }}>
                    {product.name}
                  </h3>
                  <p style={{ marginTop: 6, fontSize: 12, color: '#6B7280' }}>
                    ★ {product.rating.toFixed(1)} ({product.review_count.toLocaleString()})
                  </p>

                  <div
                    style={{
                      marginTop: 8,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontSize: 30, fontWeight: 800, color: '#111827' }}>
                      ${product.price.toFixed(2)}
                    </span>
                    {hasDiscount ? (
                      <span
                        style={{ fontSize: 12, color: '#9CA3AF', textDecoration: 'line-through' }}
                      >
                        ${original.toFixed(2)}
                      </span>
                    ) : null}
                  </div>

                  {discount ? (
                    <span
                      style={{
                        marginTop: 6,
                        display: 'inline-block',
                        borderRadius: 9999,
                        background: '#ECFDF5',
                        color: '#047857',
                        fontSize: 12,
                        fontWeight: 700,
                        padding: '2px 8px',
                      }}
                    >
                      {discount}% OFF
                    </span>
                  ) : null}

                  <Button
                    type="button"
                    size="sm"
                    style={{ marginTop: 10, width: '100%' }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </article>
              );
            })}
          </div>

          <div
            style={{
              border: '1px solid #E5E7EB',
              borderTop: 'none',
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              overflow: 'hidden',
            }}
          >
            {SPEC_ROWS.map((spec, index) => (
              <div
                key={spec.key}
                style={{
                  display: 'flex',
                  borderBottom: index < SPEC_ROWS.length - 1 ? '1px solid #E5E7EB' : undefined,
                  background: isRowDifferent(spec.key) ? '#FFFBEB' : '#FFFFFF',
                }}
              >
                <div
                  style={{
                    width: 144,
                    minWidth: 144,
                    borderRight: '1px solid #E5E7EB',
                    background: '#F9FAFB',
                    padding: '12px 16px',
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>
                    {spec.label}
                  </span>
                </div>
                {products.map((product, valueIndex) => (
                  <div
                    key={`${product.id}-${spec.key}`}
                    style={{
                      flex: 1,
                      minWidth: 180,
                      maxWidth: 320,
                      padding: '12px 16px',
                      borderRight:
                        valueIndex < products.length - 1 ? '1px solid #E5E7EB' : undefined,
                      fontSize: 12,
                      color: '#4B5563',
                    }}
                  >
                    {getSpec(product.id, spec.key)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 12, color: '#6D28D9', fontWeight: 600 }}>
        Highlighted rows show differences
      </p>

      <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
        <Button type="button" variant="outline" onClick={() => navigate('/plp?subcategory_id=3')}>
          Add More Laptops
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            clearCompare();
            navigate('/plp?subcategory_id=3');
          }}
        >
          Reset Comparison
        </Button>
      </div>
    </section>
  );
}
