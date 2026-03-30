import { useMemo, useState, type ReactNode } from 'react';
import type { DeliveryAddress } from '../types';

interface NewAddressFormProps {
  values: Partial<DeliveryAddress>;
  onChange: (fields: Partial<DeliveryAddress>) => void;
  onCancel: () => void;
  onSave: () => void;
}

const COUNTRIES = ['India', 'United States', 'United Kingdom'];

export function NewAddressForm({ values, onChange, onCancel, onSave }: NewAddressFormProps) {
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const missingFields = useMemo(() => {
    const required: Array<keyof DeliveryAddress> = [
      'fullName',
      'phone',
      'addressLine1',
      'city',
      'state',
      'postalCode',
      'country',
    ];

    return required.filter(field => !values[field]?.toString().trim());
  }, [values]);

  const showError = (field: keyof DeliveryAddress) =>
    attemptedSubmit && missingFields.includes(field);

  return (
    <div
      data-testid="new-address-form"
      className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-gray-50)] p-4 lg:p-5"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Full Name *" error={showError('fullName')}>
          <input
            value={values.fullName ?? ''}
            onChange={event => onChange({ fullName: event.target.value })}
            placeholder="Enter full name"
            className="h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
          />
        </Field>

        <Field label="Phone *" error={showError('phone')}>
          <input
            value={values.phone ?? ''}
            onChange={event => onChange({ phone: event.target.value })}
            placeholder="+1 (234) 123-4567"
            className="h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
          />
        </Field>
      </div>

      <div className="mt-3">
        <Field label="Address Line 1 *" error={showError('addressLine1')}>
          <input
            value={values.addressLine1 ?? ''}
            onChange={event => onChange({ addressLine1: event.target.value })}
            placeholder="Street, apartment, unit, building"
            className="h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
          />
        </Field>
      </div>

      <div className="mt-3">
        <Field label="Address Line 2 (Optional)">
          <input
            value={values.addressLine2 ?? ''}
            onChange={event => onChange({ addressLine2: event.target.value })}
            placeholder="Apartment, suite, floor"
            className="h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
          />
        </Field>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Field label="City *" error={showError('city')}>
          <input
            value={values.city ?? ''}
            onChange={event => onChange({ city: event.target.value })}
            placeholder="City"
            className="h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
          />
        </Field>

        <Field label="State *" error={showError('state')}>
          <input
            value={values.state ?? ''}
            onChange={event => onChange({ state: event.target.value })}
            placeholder="State"
            className="h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
          />
        </Field>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Field label="Postal Code *" error={showError('postalCode')}>
          <input
            value={values.postalCode ?? ''}
            onChange={event => onChange({ postalCode: event.target.value })}
            placeholder="123456"
            className="h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
          />
        </Field>

        <Field label="Country *" error={showError('country')}>
          <select
            value={values.country ?? 'United States'}
            onChange={event => onChange({ country: event.target.value })}
            className="h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
          >
            {COUNTRIES.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            setAttemptedSubmit(true);
            if (missingFields.length === 0) onSave();
          }}
          className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          Save Address
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold text-[var(--color-text-muted)]">
        {label}
      </span>
      <div className={error ? 'rounded-md ring-1 ring-red-500' : ''}>{children}</div>
      {error ? (
        <span className="mt-1 block text-xs text-red-600">This field is required</span>
      ) : null}
    </label>
  );
}
