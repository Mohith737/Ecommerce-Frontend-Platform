import editIcon from '@/assets/icons/edit.svg';
import trashIcon from '@/assets/icons/trash.svg';
import type { DeliveryAddress } from '../types';
import { NewAddressForm } from './NewAddressForm';

interface AddressStepProps {
  addresses: DeliveryAddress[];
  selectedAddressId: string | null;
  isAddingNew: boolean;
  newAddressForm: Partial<DeliveryAddress>;
  onSelectAddress: (id: string) => void;
  onToggleAddNew: () => void;
  onUpdateNewAddressForm: (fields: Partial<DeliveryAddress>) => void;
  onSaveNewAddress: () => void;
  onContinue: () => void;
}

export function AddressStep({
  addresses,
  selectedAddressId,
  isAddingNew,
  newAddressForm,
  onSelectAddress,
  onToggleAddNew,
  onUpdateNewAddressForm,
  onSaveNewAddress,
  onContinue,
}: AddressStepProps) {
  return (
    <section
      data-testid="address-step"
      style={{
        borderRadius: 12,
        border: '1px solid var(--color-border)',
        background: '#fff',
        padding: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Delivery Address
        </h2>
        <button
          data-testid="add-new-address-btn"
          type="button"
          onClick={onToggleAddNew}
          style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-primary)' }}
        >
          {isAddingNew ? 'Close' : '+ Add New Address'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {addresses.map(address => {
          const active = selectedAddressId === address.id;
          return (
            <button
              key={address.id}
              data-testid={`address-card-${address.id}`}
              type="button"
              onClick={() => onSelectAddress(address.id)}
              style={{
                width: '100%',
                borderRadius: 10,
                border: `2px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: active ? 'var(--color-primary-light)' : '#fff',
                padding: 14,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {address.fullName}{' '}
                    {address.isDefault ? (
                      <span
                        style={{
                          borderRadius: 9999,
                          background: '#dcfce7',
                          color: '#15803d',
                          padding: '2px 8px',
                          fontSize: 10,
                          marginLeft: 6,
                        }}
                      >
                        DEFAULT
                      </span>
                    ) : null}
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>{address.phone}</p>
                  <p style={{ marginTop: 4, fontSize: 14, color: 'var(--color-text-secondary)' }}>
                    {address.addressLine1}
                    {address.addressLine2 ? `, ${address.addressLine2}` : ''}, {address.city},{' '}
                    {address.state} - {address.postalCode}, {address.country}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={editIcon} alt="edit" style={{ width: 14, height: 14, opacity: 0.65 }} />
                  <img
                    src={trashIcon}
                    alt="remove"
                    style={{ width: 14, height: 14, opacity: 0.65 }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {isAddingNew ? (
        <NewAddressForm
          values={newAddressForm}
          onChange={onUpdateNewAddressForm}
          onCancel={onToggleAddNew}
          onSave={onSaveNewAddress}
        />
      ) : null}

      <div style={{ paddingTop: 10 }}>
        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedAddressId}
          style={{
            width: '100%',
            borderRadius: 10,
            background: 'var(--color-primary)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            padding: '12px 14px',
            opacity: selectedAddressId ? 1 : 0.5,
            cursor: selectedAddressId ? 'pointer' : 'not-allowed',
          }}
        >
          Continue →
        </button>
      </div>
    </section>
  );
}
