import type { CartItem } from '@/stores/cartStore';
import type { DeliveryAddress, PaymentMethod } from '../types';

interface ReviewStepProps {
  selectedAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  isPlacingOrder: boolean;
  onChangeAddress: () => void;
  onChangePayment: () => void;
  onPlaceOrder: () => void;
}

export function ReviewStep({
  selectedAddress,
  paymentMethod,
  isPlacingOrder,
  onChangeAddress,
  onChangePayment,
  onPlaceOrder,
}: ReviewStepProps) {
  return (
    <section
      data-testid="review-step"
      className="space-y-4 rounded-xl border border-[var(--color-border)] bg-white p-4"
    >
      <div className="rounded-lg border border-[var(--color-border)] p-3">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Delivery Address
          </h3>
          <button
            type="button"
            onClick={onChangeAddress}
            className="border-0 bg-transparent p-0 text-xs font-semibold text-[var(--color-primary)]"
          >
            Change
          </button>
        </div>
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
          {selectedAddress.fullName}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)]">
          {selectedAddress.addressLine1}, {selectedAddress.city}, {selectedAddress.state} -{' '}
          {selectedAddress.postalCode}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)]">Phone: {selectedAddress.phone}</p>
      </div>

      <div className="rounded-lg border border-[var(--color-border)] p-3">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Payment Method</h3>
          <button
            type="button"
            onClick={onChangePayment}
            className="border-0 bg-transparent p-0 text-xs font-semibold text-[var(--color-primary)]"
          >
            Change
          </button>
        </div>
        <p className="text-sm text-[var(--color-text-primary)]">
          {paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onChangePayment}
          className="rounded-md border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium"
        >
          Back
        </button>
        <button
          data-testid="place-order-btn"
          type="button"
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </section>
  );
}
