import checkCircleIcon from '@/assets/icons/check-circle.svg';
import tagIcon from '@/assets/icons/tag.svg';
import xCircleIcon from '@/assets/icons/x-circle.svg';
import { Button } from '@/design-system/ui/atoms';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  couponCode: string;
  couponStatus: 'idle' | 'valid' | 'invalid' | 'incorrect';
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
}

const CHIP_CODES = ['SAVE10', 'WHITE', 'WCM10', 'PCBDAY'];

export function OrderSummary({
  subtotal,
  discount,
  tax,
  total,
  couponCode,
  couponStatus,
  onCouponCodeChange,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
}: OrderSummaryProps) {
  return (
    <aside
      data-testid="order-summary"
      className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-4"
    >
      <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Order Summary</h2>

      <div>
        <p className="mb-2 text-xs font-semibold text-[var(--color-text-muted)]">
          Apply Coupon Code
        </p>
        <div className="flex items-center gap-2">
          <div
            className={`flex h-10 flex-1 items-center rounded-md border px-2 ${
              couponStatus === 'valid'
                ? 'border-green-500'
                : couponStatus === 'invalid' || couponStatus === 'incorrect'
                  ? 'border-red-400'
                  : 'border-[var(--color-border)]'
            }`}
          >
            <img src={tagIcon} alt="coupon" className="h-4 w-4 opacity-70" />
            <input
              data-testid="coupon-input"
              value={couponCode}
              onChange={event => onCouponCodeChange(event.target.value)}
              placeholder="Enter coupon code"
              className="ml-2 w-full bg-transparent text-sm outline-none"
            />
          </div>
          <Button
            data-testid="apply-coupon-btn"
            type="button"
            variant="outline"
            size="sm"
            onClick={onApplyCoupon}
            disabled={couponCode.trim().length === 0}
          >
            Apply
          </Button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {CHIP_CODES.map(chip => (
            <button
              key={chip}
              type="button"
              className="rounded-full border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-text-muted)]"
              onClick={() => onCouponCodeChange(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        {couponStatus === 'valid' ? (
          <div
            data-testid="coupon-success"
            className="mt-2 flex items-center justify-between rounded-md bg-green-50 p-2 text-xs text-green-700"
          >
            <span className="inline-flex items-center gap-1">
              <img src={checkCircleIcon} alt="success" className="h-3.5 w-3.5" />
              WCM10 - Coupon Applied Successfully!
            </span>
            <button
              data-testid="remove-coupon-btn"
              type="button"
              className="font-semibold"
              onClick={onRemoveCoupon}
            >
              Remove
            </button>
          </div>
        ) : null}

        {couponStatus === 'incorrect' ? (
          <div
            data-testid="coupon-error"
            className="mt-2 inline-flex items-center gap-1 text-xs text-red-600"
          >
            <img src={xCircleIcon} alt="error" className="h-3.5 w-3.5" />
            This coupon is not applicable for your account. WCM10 is valid for first orders only.
          </div>
        ) : null}

        {couponStatus === 'invalid' ? (
          <div
            data-testid="coupon-error"
            className="mt-2 inline-flex items-center gap-1 text-xs text-red-600"
          >
            <img src={xCircleIcon} alt="error" className="h-3.5 w-3.5" />
            Invalid coupon code. Please check and try again.
          </div>
        ) : null}
      </div>

      <div className="space-y-1 border-t border-[var(--color-border)] pt-3 text-sm">
        <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
        <Row label="Product Discount" value={`-$${discount.toFixed(2)}`} highlight={discount > 0} />
        <Row label="Tax (8%)" value={`$${tax.toFixed(2)}`} />
        <Row label="Shipping" value="FREE" highlight />
      </div>

      <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        <span className="text-base font-semibold text-[var(--color-text-primary)]">Total</span>
        <span className="text-xl font-bold text-[var(--color-text-primary)]">
          ${total.toFixed(2)}
        </span>
      </div>

      <Button
        data-testid="proceed-to-checkout-btn"
        type="button"
        fullWidth
        onClick={onProceedToCheckout}
      >
        Proceed to Checkout
      </Button>

      <div className="space-y-1 text-xs text-[var(--color-text-muted)]">
        <p>Secure payment - SSL encrypted</p>
        <p>All prices include applicable taxes</p>
      </div>
    </aside>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--color-text-muted)]">{label}</span>
      <span
        className={highlight ? 'font-semibold text-green-600' : 'text-[var(--color-text-primary)]'}
      >
        {value}
      </span>
    </div>
  );
}
