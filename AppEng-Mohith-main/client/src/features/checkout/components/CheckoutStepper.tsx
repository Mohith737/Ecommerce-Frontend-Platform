import checkCircleFilled from '@/assets/icons/check-circle-filled.svg';
import type { CheckoutStep } from '../types';

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

const STEPS: Array<{ key: CheckoutStep; label: string; subtitle: string }> = [
  { key: 'address', label: 'Address', subtitle: 'Delivery address' },
  { key: 'payment', label: 'Payment', subtitle: 'Payment method' },
  { key: 'review', label: 'Review', subtitle: 'Order overview' },
];

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIndex = STEPS.findIndex(step => step.key === currentStep);

  return (
    <div
      data-testid="checkout-stepper"
      style={{
        borderRadius: 12,
        border: '1px solid var(--color-border)',
        background: '#fff',
        padding: '14px 16px',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 14 }}>
        {STEPS.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          return (
            <div key={step.key} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {done ? (
                  <img src={checkCircleFilled} alt="done" style={{ width: 22, height: 22 }} />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      width: 22,
                      height: 22,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 9999,
                      fontSize: 11,
                      fontWeight: 700,
                      background: active ? 'var(--color-primary)' : 'var(--color-gray-100)',
                      color: active ? '#fff' : 'var(--color-text-muted)',
                      border: active ? 'none' : '1px solid var(--color-border)',
                    }}
                  >
                    {index + 1}
                  </div>
                )}
                <p
                  style={{
                    fontSize: 28,
                    lineHeight: 1,
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {step.label}
                </p>
              </div>
              <p
                style={{
                  marginLeft: 30,
                  marginTop: 3,
                  fontSize: 12,
                  color: 'var(--color-text-muted)',
                }}
              >
                {step.subtitle}
              </p>
              {index < STEPS.length - 1 ? (
                <div
                  style={{
                    position: 'absolute',
                    right: -8,
                    top: 11,
                    width: 8,
                    height: 1,
                    background: 'var(--color-border)',
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
