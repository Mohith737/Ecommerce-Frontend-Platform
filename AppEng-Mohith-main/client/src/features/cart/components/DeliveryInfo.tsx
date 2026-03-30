import { useState } from 'react';
import locationIcon from '@/assets/icons/location.svg';
import { Button } from '@/design-system/ui/atoms';

export function DeliveryInfo() {
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const checkDelivery = () => {
    if (pincode.trim() === '560029') {
      setStatus('success');
      setMessage('Delivery available for this location');
      return;
    }
    setStatus('error');
    setMessage('Delivery not available for this location');
  };

  return (
    <section
      data-testid="delivery-info"
      className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-4"
    >
      <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Delivery Information</h3>

      <div className="flex items-center gap-2">
        <div className="flex h-10 flex-1 items-center rounded-md border border-[var(--color-border)] px-2">
          <img src={locationIcon} alt="location" className="h-4 w-4 opacity-70" />
          <input
            data-testid="pincode-input"
            placeholder="Enter delivery pincode"
            className="ml-2 w-full bg-transparent text-sm outline-none"
            value={pincode}
            onChange={event => {
              setPincode(event.target.value);
              if (status !== 'idle') {
                setStatus('idle');
                setMessage('');
              }
            }}
          />
        </div>
        <Button
          data-testid="check-delivery-btn"
          type="button"
          variant="outline"
          size="sm"
          onClick={checkDelivery}
        >
          Check
        </Button>
      </div>

      {status !== 'idle' ? (
        <p
          data-testid={status === 'success' ? 'delivery-success-msg' : 'delivery-error-msg'}
          className={`text-xs ${
            status === 'success' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
          }`}
        >
          {message}
        </p>
      ) : null}

      <label className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <input type="checkbox" defaultChecked />
        Free shipping for orders above INR 700
      </label>
      <label className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <input type="checkbox" defaultChecked />
        10% extra discount on prepaid orders
      </label>
    </section>
  );
}
