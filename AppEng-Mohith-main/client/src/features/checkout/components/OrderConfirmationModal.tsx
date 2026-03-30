import checkGreenIcon from '@/assets/icons/check-green.svg';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  orderId: string;
  estimatedDelivery: string;
  onTrackOrder: () => void;
  onContinueShopping: () => void;
}

export function OrderConfirmationModal({
  isOpen,
  orderId,
  estimatedDelivery,
  onTrackOrder,
  onContinueShopping,
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        data-testid="order-confirmation-modal"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <img src={checkGreenIcon} alt="confirmed" className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Order Confirmed!</h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-gray-50)] p-3 font-mono text-sm">
            {orderId}
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            Estimated Delivery: {estimatedDelivery}
          </p>
          <button
            data-testid="track-order-btn"
            type="button"
            onClick={onTrackOrder}
            className="mt-5 w-full rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white"
          >
            Track Order
          </button>
          <button
            type="button"
            onClick={onContinueShopping}
            className="mt-2 w-full rounded-lg border border-[var(--color-border)] py-2.5 text-sm font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
