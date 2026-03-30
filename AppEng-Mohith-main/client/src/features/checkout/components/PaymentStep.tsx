import { useMemo, useState, type ReactNode } from 'react';
import type { CardDetails, PaymentMethod } from '../types';

interface PaymentStepProps {
  paymentMethod: PaymentMethod;
  cardDetails: CardDetails;
  hasValidationError: boolean;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onUpdateCard: (details: Partial<CardDetails>) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function PaymentStep({
  paymentMethod,
  cardDetails,
  hasValidationError,
  onSelectPaymentMethod,
  onUpdateCard,
  onContinue,
  onBack,
}: PaymentStepProps) {
  const [saveCard, setSaveCard] = useState(false);

  const errors = useMemo(() => {
    const rawCard = cardDetails.cardNumber.replace(/\s/g, '');
    const expiryValid = /^\d{2}\/\d{2}$/.test(cardDetails.expiryDate);
    const cvvValid = /^\d{3,4}$/.test(cardDetails.cvv);

    return {
      card: hasValidationError && rawCard.length !== 16,
      expiry: hasValidationError && !expiryValid,
      cvv: hasValidationError && !cvvValid,
      name: hasValidationError && !cardDetails.cardholderName.trim(),
    };
  }, [cardDetails, hasValidationError]);

  return (
    <section
      data-testid="payment-step"
      className="rounded-xl border border-[var(--color-border)] bg-white p-4 lg:p-5"
      style={{
        borderRadius: 12,
        border: '1px solid var(--color-border)',
        background: '#fff',
        padding: 16,
      }}
    >
      <h2
        className="text-2xl font-bold text-[var(--color-text-primary)] lg:text-3xl"
        style={{ fontSize: 44, lineHeight: 1.05 }}
      >
        Payment Method
      </h2>

      <div className="mt-4 space-y-2.5">
        <MethodCard
          title="Credit / Debit Card"
          subtitle="Visa, Mastercard, Rupay"
          active={paymentMethod === 'card'}
          onClick={() => onSelectPaymentMethod('card')}
        />
        <MethodCard
          title="Google Pay, PhonePe, Paytm"
          subtitle="Coming soon"
          active={paymentMethod === 'upi'}
          onClick={() => onSelectPaymentMethod('upi')}
        />
        <MethodCard
          title="Net Banking"
          subtitle="All major banks supported"
          active={paymentMethod === 'netbanking'}
          onClick={() => onSelectPaymentMethod('netbanking')}
        />
        <MethodCard
          title="Digital Wallet"
          subtitle="Amazon Pay, Paytm"
          active={paymentMethod === 'wallet'}
          onClick={() => onSelectPaymentMethod('wallet')}
        />
      </div>

      {hasValidationError ? (
        <div
          data-testid="payment-error-banner"
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          Add valid payment details to proceed.
        </div>
      ) : null}

      {paymentMethod === 'card' ? (
        <div className="mt-4 rounded-lg border border-[var(--color-border)] p-3 lg:p-4">
          <div className="space-y-3">
            <Field
              label="Card Number *"
              error={errors.card ? 'Invalid card number' : null}
              input={
                <input
                  data-testid="card-number-input"
                  value={cardDetails.cardNumber}
                  onChange={event => {
                    const digits = event.target.value.replace(/\D/g, '').slice(0, 16);
                    onUpdateCard({ cardNumber: digits.replace(/(.{4})/g, '$1 ').trim() });
                  }}
                  placeholder="1234 5678 9012 3456"
                  className="h-11 w-full rounded-md border border-[var(--color-border)] px-3 text-sm"
                />
              }
            />

            <Field
              label="Cardholder Name *"
              error={errors.name ? 'Cardholder name is required' : null}
              input={
                <input
                  data-testid="cardholder-name-input"
                  value={cardDetails.cardholderName}
                  onChange={event => onUpdateCard({ cardholderName: event.target.value })}
                  placeholder="John Doe"
                  className="h-11 w-full rounded-md border border-[var(--color-border)] px-3 text-sm"
                />
              }
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Expiry Date *"
                error={errors.expiry ? 'Invalid expiry' : null}
                input={
                  <input
                    data-testid="expiry-input"
                    value={cardDetails.expiryDate}
                    onChange={event => {
                      const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
                      onUpdateCard({
                        expiryDate:
                          digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits,
                      });
                    }}
                    placeholder="MM/YY"
                    className="h-11 w-full rounded-md border border-[var(--color-border)] px-3 text-sm"
                  />
                }
              />

              <Field
                label="CVV *"
                error={errors.cvv ? 'Invalid CVV' : null}
                input={
                  <input
                    data-testid="cvv-input"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={event =>
                      onUpdateCard({ cvv: event.target.value.replace(/\D/g, '').slice(0, 4) })
                    }
                    placeholder="123"
                    className="h-11 w-full rounded-md border border-[var(--color-border)] px-3 text-sm"
                  />
                }
              />
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={event => setSaveCard(event.target.checked)}
              />
              Save card information for future use
            </label>
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          Continue →
        </button>
      </div>
    </section>
  );
}

function MethodCard({
  title,
  subtitle,
  active,
  onClick,
}: {
  title: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border p-3 text-left transition ${
        active
          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
          : 'border-[var(--color-border)] bg-white hover:bg-[var(--color-gray-50)]'
      }`}
      style={{
        width: '100%',
        borderRadius: 10,
        border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
        background: active ? 'var(--color-primary-light)' : '#fff',
        padding: 12,
        textAlign: 'left',
      }}
    >
      <p
        className="text-[15px] font-semibold text-[var(--color-text-primary)]"
        style={{ fontSize: 16 }}
      >
        {title}
      </p>
      <p className="text-xs text-[var(--color-text-muted)]">{subtitle}</p>
    </button>
  );
}

function Field({ label, error, input }: { label: string; error: string | null; input: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-[var(--color-text-muted)]">
        {label}
      </span>
      <div className={error ? 'rounded-md ring-1 ring-red-500' : ''}>{input}</div>
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
