import { Button } from '@/design-system/ui/atoms';

export function OrderSuccessPage({ params }: { params: Record<string, string> }) {
  return (
    <div
      data-testid="order-success-page"
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--color-gray-50)' }}
    >
      <div
        className="p-8 text-center"
        style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div
          className="text-6xl"
          style={{ animation: 'scaleIn var(--duration-base) var(--ease-spring)' }}
        >
          ✅
        </div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)' }}>
          Order Placed Successfully!
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Order ID: {params.orderId ?? '-'}</p>
        <Button className="mt-4" onClick={() => (window.location.hash = '#/home')}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
