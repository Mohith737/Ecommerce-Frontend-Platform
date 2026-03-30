import { useState } from 'react';
import type { OrderOut } from '@/api-sdk';

interface OrdersPageProps {
  orders: OrderOut[];
  isLoading: boolean;
  onTrackOrder: (orderId: number) => void;
}

function badgeClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes('deliver')) return 'bg-green-100 text-green-700';
  if (normalized.includes('transit')) return 'bg-blue-100 text-blue-700';
  if (normalized.includes('cancel')) return 'bg-red-100 text-red-700';
  return 'bg-yellow-100 text-yellow-700';
}

export function OrdersPage({ orders, isLoading, onTrackOrder }: OrdersPageProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderOut | null>(null);

  if (isLoading) {
    return (
      <section data-testid="orders-page" className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-gray-100)]"
          />
        ))}
      </section>
    );
  }

  if (selectedOrder) {
    return (
      <section
        data-testid="orders-page"
        className="space-y-4 rounded-xl border border-[var(--color-border)] bg-white p-4"
      >
        <button
          type="button"
          onClick={() => setSelectedOrder(null)}
          className="text-sm font-semibold text-[var(--color-primary)]"
        >
          ← Back to Orders
        </button>
        <div data-testid="order-detail-view" className="space-y-3">
          <h2 className="text-2xl font-bold">Order Details #{selectedOrder.id}</h2>
          <p className="text-sm text-[var(--color-text-muted)]">Status: {selectedOrder.status}</p>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-md border border-[var(--color-border)] p-3 text-sm">
              <p className="font-semibold">Delivery Address</p>
              <p>{selectedOrder.shipping_name}</p>
              <p>{selectedOrder.shipping_address}</p>
              <p>
                {selectedOrder.shipping_city}, {selectedOrder.shipping_state}{' '}
                {selectedOrder.shipping_zip}
              </p>
            </div>
            <div className="rounded-md border border-[var(--color-border)] p-3 text-sm">
              <p className="font-semibold">Payment Method</p>
              <p>Credit / Debit Card</p>
              <p>**** 3456</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-testid="orders-page" className="space-y-4">
      <h2 className="text-2xl font-bold">My Orders</h2>
      {orders.length === 0 ? (
        <div
          className="rounded-xl border border-[var(--color-border)] bg-white"
          style={{
            minHeight: 220,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 8,
            padding: 24,
          }}
        >
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">No orders yet</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Your order history will appear here after your first purchase.
          </p>
          <a
            href="#/plp"
            className="mt-2 inline-block rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
          >
            Start Shopping
          </a>
        </div>
      ) : null}

      {orders.map(order => (
        <article
          key={order.id}
          data-testid={`order-card-${order.id}`}
          className="rounded-xl border border-[var(--color-border)] bg-white p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button type="button" className="text-left" onClick={() => setSelectedOrder(order)}>
              <p className="text-sm font-semibold">ORD-{order.id}</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Placed {new Date(order.created_at).toLocaleDateString()}
              </p>
            </button>
            <span
              className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(order.status)}`}
            >
              {order.status}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {order.items.slice(0, 1).map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.product_name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              data-testid={`track-order-${order.id}`}
              type="button"
              onClick={() => onTrackOrder(order.id)}
              className="rounded-md bg-[var(--color-primary)] px-3 py-2 text-xs font-semibold text-white"
            >
              Track Order
            </button>
            <button
              type="button"
              className="rounded-md border border-[var(--color-border)] px-3 py-2 text-xs font-semibold"
            >
              Buy Again
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
