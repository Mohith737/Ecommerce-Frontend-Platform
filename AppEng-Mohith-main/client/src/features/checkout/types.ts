export interface DeliveryAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export type PaymentMethod = 'card' | 'netbanking' | 'upi' | 'wallet';

export interface CardDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export type CheckoutStep = 'address' | 'payment' | 'review';

export interface CheckoutState {
  step: CheckoutStep;
  selectedAddressId: string | null;
  paymentMethod: PaymentMethod;
  cardDetails: CardDetails;
  isAddingNewAddress: boolean;
}
