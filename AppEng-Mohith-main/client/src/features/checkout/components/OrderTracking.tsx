import { useQuery } from '@tanstack/react-query';
import { getOrder } from '@/api-sdk';
import packageIcon from '@/assets/icons/package.svg';
import { ErrorState } from '@/design-system/ui/molecules';
import { navigate } from '@/utils/navigate';

const TRACKING_STEPS = [
  {
    id: 1,
    label: 'Order Placed',
    sublabel: 'Your order is confirmed',
  },
  {
    id: 2,
    label: 'Order Confirmed',
    sublabel: 'Payment verified',
  },
  {
    id: 3,
    label: 'Picked Up',
    sublabel: 'Package prepared',
  },
  {
    id: 4,
    label: 'In Transit',
    sublabel: 'Regional hub',
  },
  {
    id: 5,
    label: 'Out for Delivery',
    sublabel: 'Near You',
  },
  {
    id: 6,
    label: 'Delivered',
    sublabel: 'Your Address',
  },
] as const;

export function OrderTracking({ orderId }: { orderId?: string }) {
  const numericOrderId = Number((orderId ?? '').replace(/[^\d]/g, ''));
  const orderQuery = useQuery({
    queryKey: ['order', numericOrderId],
    queryFn: () => getOrder(numericOrderId),
    enabled: Number.isFinite(numericOrderId) && numericOrderId > 0,
    staleTime: 1000 * 60,
  });

  const status = (orderQuery.data?.status ?? '').toLowerCase();
  const currentStepIndex = (() => {
    if (status.includes('deliver')) return 5;
    if (status.includes('out for delivery')) return 4;
    if (status.includes('transit') || status.includes('ship')) return 3;
    if (status.includes('pick')) return 2;
    if (status.includes('confirm') || status.includes('process') || status.includes('paid'))
      return 1;
    if (status) return 0;
    return 3;
  })();
  const progressPercent = Math.round(((currentStepIndex + 1) / TRACKING_STEPS.length) * 100);
  const currentStatusLabel = TRACKING_STEPS[currentStepIndex]?.label ?? 'In Transit';

  if (!orderId) {
    return (
      <ErrorState
        title="Order ID missing"
        message="Please open tracking from your order history."
        onRetry={() => navigate('/profile/orders')}
      />
    );
  }

  if (orderQuery.isLoading) {
    return (
      <section className="mx-auto w-full max-w-5xl space-y-3 px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-8 w-72 animate-pulse rounded bg-[var(--color-gray-200)]" />
        <div className="h-32 animate-pulse rounded-xl bg-[var(--color-gray-100)]" />
        <div className="h-72 animate-pulse rounded-xl bg-[var(--color-gray-100)]" />
      </section>
    );
  }

  if (orderQuery.isError || !orderQuery.data) {
    return (
      <ErrorState
        title="Unable to load tracking"
        message="We could not fetch this order from backend."
        onRetry={() => orderQuery.refetch()}
      />
    );
  }

  const order = orderQuery.data;
  const orderNumber = `ORD-${order.id}`;
  const orderItems = order.items ?? [];
  const shippingName = order.shipping_name;
  const shippingAddress = `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state}, ${order.shipping_country}`;
  const shippingPhone = order.shipping_phone;
  const shippingEmail = order.shipping_email;
  const placedAt = new Date(order.created_at);
  const dateText = placedAt.toLocaleDateString();
  const timeText = placedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      data-testid="order-tracking-page"
      className="mx-auto w-full max-w-5xl space-y-5 px-4 py-8 sm:px-6 lg:px-8"
    >
      <button
        type="button"
        onClick={() => navigate('/home')}
        className="border-0 bg-transparent p-0 text-sm font-semibold text-[var(--color-primary)]"
      >
        ← Back to Homepage
      </button>

      <header>
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">Track Your Order</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">Order Number: {orderNumber}</p>
      </header>

      <section className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <img src={packageIcon} alt="package" className="h-5 w-5" />
          <span className="rounded-full border border-[var(--color-primary)]/35 bg-[var(--color-primary-light)] px-2 py-0.5 text-xs font-semibold text-[var(--color-primary)]">
            {currentStatusLabel}
          </span>
        </div>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Your package is on the way and will arrive soon.
        </p>

        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
            <span>Delivery Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--color-gray-100)]">
            <div
              className="h-full bg-[var(--color-primary)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      <section
        data-testid="tracking-timeline"
        className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm"
      >
        <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)]">
          Tracking History
        </h2>
        <ol className="space-y-4">
          {TRACKING_STEPS.map((step, index) => (
            <li key={step.id} className="relative grid grid-cols-[20px_1fr_auto] gap-3">
              <div className="relative mt-1 flex justify-center">
                {index < TRACKING_STEPS.length - 1 ? (
                  <span
                    className="absolute left-1/2 top-3 -translate-x-1/2"
                    style={{ width: 2, height: 34, background: 'var(--color-border)' }}
                  />
                ) : null}
                <span
                  className={`h-3 w-3 rounded-full ${index <= currentStepIndex ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-gray-300)]'}`}
                />
              </div>
              <div>
                <p className="text-2xl font-semibold leading-tight text-[var(--color-text-primary)]">
                  {step.label}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">{step.sublabel}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{dateText}</p>
              </div>
              <p className="pt-0.5 text-sm text-[var(--color-text-muted)]">
                {index <= currentStepIndex ? timeText : '—'}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
          <h3 className="mb-2 text-sm font-bold text-[var(--color-text-primary)]">Order Details</h3>
          <p className="text-xs text-[var(--color-text-muted)]">Delivery Address</p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {shippingName}, {shippingAddress}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
          <h3 className="mb-2 text-sm font-bold text-[var(--color-text-primary)]">
            Contact Information
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">{shippingPhone}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{shippingEmail}</p>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-[var(--color-text-primary)]">
          Items in This Order
        </h3>
        {orderItems.length > 0 ? (
          orderItems.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-md border border-[var(--color-border)] p-3"
            >
              <img
                src={item.product_image}
                alt={item.product_name}
                className="h-12 w-12 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {item.product_name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-md border border-[var(--color-border)] p-4 text-sm text-[var(--color-text-muted)]">
            No items available for this order.
          </div>
        )}
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="rounded-md border border-[var(--color-primary)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]"
        >
          Continue Shopping
        </button>
        <button
          type="button"
          className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}
