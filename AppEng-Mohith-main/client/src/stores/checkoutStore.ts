import { create } from 'zustand';
import type {
  CardDetails,
  CheckoutStep,
  DeliveryAddress,
  PaymentMethod,
} from '@/features/checkout/types';

interface CheckoutStoreState {
  step: CheckoutStep;
  selectedAddressId: string | null;
  paymentMethod: PaymentMethod;
  cardDetails: CardDetails;
  isAddingNewAddress: boolean;
  newAddressForm: Partial<DeliveryAddress>;
  setStep: (step: CheckoutStep) => void;
  selectAddress: (id: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  updateCardDetails: (details: Partial<CardDetails>) => void;
  toggleAddNewAddress: () => void;
  updateNewAddressForm: (fields: Partial<DeliveryAddress>) => void;
  reset: () => void;
}

const DEFAULT_CARD: CardDetails = {
  cardNumber: '',
  cardholderName: '',
  expiryDate: '',
  cvv: '',
};

export const useCheckoutStore = create<CheckoutStoreState>(set => ({
  step: 'address',
  selectedAddressId: 'addr-1',
  paymentMethod: 'card',
  cardDetails: DEFAULT_CARD,
  isAddingNewAddress: false,
  newAddressForm: {},
  setStep: step => set({ step }),
  selectAddress: id => set({ selectedAddressId: id }),
  setPaymentMethod: paymentMethod => set({ paymentMethod }),
  updateCardDetails: details =>
    set(state => ({ cardDetails: { ...state.cardDetails, ...details } })),
  toggleAddNewAddress: () => set(state => ({ isAddingNewAddress: !state.isAddingNewAddress })),
  updateNewAddressForm: fields =>
    set(state => ({ newAddressForm: { ...state.newAddressForm, ...fields } })),
  reset: () =>
    set({
      step: 'address',
      selectedAddressId: 'addr-1',
      paymentMethod: 'card',
      cardDetails: DEFAULT_CARD,
      isAddingNewAddress: false,
      newAddressForm: {},
    }),
}));
