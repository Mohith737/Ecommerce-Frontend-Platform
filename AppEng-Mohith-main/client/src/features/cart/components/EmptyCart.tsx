import shoppingBagIcon from '@/assets/icons/shopping-bag.svg';
import { Button } from '@/design-system/ui/atoms';

export function EmptyCart({ onContinueShopping }: { onContinueShopping: () => void }) {
  return (
    <section
      data-testid="empty-cart"
      style={{
        margin: '0 auto',
        maxWidth: '640px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
        background: 'var(--color-white)',
        padding: '48px 32px',
        textAlign: 'center',
      }}
    >
      <img src={shoppingBagIcon} alt="empty cart" style={{ width: 64, height: 64, opacity: 0.8 }} />
      <h2
        style={{
          marginTop: 12,
          fontSize: 40,
          lineHeight: 1.1,
          fontWeight: 800,
          color: 'var(--color-text-primary)',
        }}
      >
        Your Cart is Empty
      </h2>
      <p style={{ marginTop: 8, fontSize: 16, color: 'var(--color-text-muted)' }}>
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
      <Button
        data-testid="continue-shopping-btn"
        type="button"
        style={{ marginTop: 18 }}
        onClick={onContinueShopping}
      >
        Continue Shopping
      </Button>
    </section>
  );
}
