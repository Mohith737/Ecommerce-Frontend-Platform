import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { type CreateOrderRequest, updateUserProfile } from '@/api-sdk';
import { AppLayout } from '@/layouts';
import { useAuth } from '@/providers/AuthProvider';
import { useCartStore } from '@/stores/cartStore';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { navigate } from '@/utils/navigate';
import { useCartQuery } from '@/features/cart/hooks/useCartQuery';
import { AddressStep } from '../components/AddressStep';
import { CheckoutStepper } from '../components/CheckoutStepper';
import { OrderConfirmationModal } from '../components/OrderConfirmationModal';
import { PaymentStep } from '../components/PaymentStep';
import { ReviewStep } from '../components/ReviewStep';
import { useCreateOrderMutation } from '../hooks/useCreateOrderMutation';
import type { DeliveryAddress } from '../types';

export function CheckoutContainer() {
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const cartItems = useCartStore(state => state.items);
  const setCartItems = useCartStore(state => state.setItems);
  const subtotal = useCartStore(state => state.subtotal);
  const {
    step,
    selectedAddressId,
    paymentMethod,
    cardDetails,
    isAddingNewAddress,
    newAddressForm,
    setStep,
    selectAddress,
    setPaymentMethod,
    updateCardDetails,
    toggleAddNewAddress,
    updateNewAddressForm,
    reset,
  } = useCheckoutStore();

  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [orderId, setOrderId] = useState('');

  const createOrderMutation = useCreateOrderMutation();
  const cartQuery = useCartQuery(isAuthenticated);

  useEffect(() => {
    if (!cartQuery.data) return;
    const mapped = cartQuery.data.map(item => ({
      id: item.id,
      productId: item.product_id,
      product: item.product,
      quantity: item.quantity,
    }));
    setCartItems(mapped);
  }, [cartQuery.data, setCartItems]);

  const realAddress = useMemo<DeliveryAddress>(
    () => ({
      id: 'addr-1',
      fullName: user?.full_name?.trim() || user?.email || 'User',
      phone: user?.phone || '',
      addressLine1: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      postalCode: user?.zip_code || '',
      country: user?.country || 'United States',
      isDefault: true,
    }),
    [user]
  );
  const allAddresses = useMemo(() => [realAddress, ...addresses], [realAddress, addresses]);

  const selectedAddress = useMemo(
    () => allAddresses.find(address => address.id === selectedAddressId) ?? allAddresses[0],
    [allAddresses, selectedAddressId]
  );

  const subtotalValue = subtotal();
  const tax = subtotalValue * 0.08;
  const total = subtotalValue + tax;

  if (!isAuthenticated) {
    navigate('/sign-in');
    return null;
  }

  const saveNewAddress = () => {
    const next: DeliveryAddress = {
      id: `addr-${Date.now()}`,
      fullName: newAddressForm.fullName ?? '',
      phone: newAddressForm.phone ?? '',
      addressLine1: newAddressForm.addressLine1 ?? '',
      addressLine2: newAddressForm.addressLine2,
      city: newAddressForm.city ?? '',
      state: newAddressForm.state ?? '',
      postalCode: newAddressForm.postalCode ?? '',
      country: newAddressForm.country ?? 'United States',
    };

    setAddresses(prev => [next, ...prev]);
    selectAddress(next.id);
    toggleAddNewAddress();
    void updateUserProfile({
      full_name: next.fullName,
      phone: next.phone,
      address: next.addressLine1,
      city: next.city,
      state: next.state,
      zip_code: next.postalCode,
      country: next.country,
    });
  };

  const persistSelectedAddressToProfile = async () => {
    if (!selectedAddress) return;
    try {
      await updateUserProfile({
        full_name: selectedAddress.fullName,
        phone: selectedAddress.phone,
        address: selectedAddress.addressLine1,
        city: selectedAddress.city,
        state: selectedAddress.state,
        zip_code: selectedAddress.postalCode,
        country: selectedAddress.country,
      });
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch {
      // Non-blocking for checkout progression.
    }
  };

  const continueFromPayment = () => {
    const raw = cardDetails.cardNumber.replace(/\s/g, '');
    const valid =
      raw.length === 16 &&
      cardDetails.cardholderName.trim().length > 1 &&
      /^\d{2}\/\d{2}$/.test(cardDetails.expiryDate) &&
      /^\d{3,4}$/.test(cardDetails.cvv);

    setValidationError(!valid);
    if (valid) setStep('review');
  };

  const placeOrder = async () => {
    const payload: CreateOrderRequest = {
      shipping_name: selectedAddress.fullName,
      shipping_email: user?.email ?? '',
      shipping_phone: selectedAddress.phone || user?.phone || '+1 (000) 000-0000',
      shipping_address: selectedAddress.addressLine1 || user?.address || '',
      shipping_city: selectedAddress.city || user?.city || '',
      shipping_state: selectedAddress.state || user?.state || '',
      shipping_zip: selectedAddress.postalCode || user?.zip_code || '',
      shipping_country: selectedAddress.country || user?.country || 'United States',
      total,
    };

    const order = await createOrderMutation.mutateAsync(payload);
    setOrderId(String(order.id));
    await queryClient.invalidateQueries({ queryKey: ['cart'] });
    await queryClient.invalidateQueries({ queryKey: ['orders'] });
    await cartQuery.refetch();
    setShowConfirmation(true);
  };

  return (
    <AppLayout showSidebar={false} showAnnouncement>
      <div
        data-testid="checkout-page"
        className="space-y-6"
        style={{
          width: 'min(1200px, calc(100% - 32px))',
          margin: '0 auto',
          paddingTop: 24,
          paddingBottom: 24,
        }}
      >
        <CheckoutStepper currentStep={step} />

        <div className="grid gap-6" style={{ gridTemplateColumns: 'minmax(0, 1fr) 340px' }}>
          <div>
            {step === 'address' ? (
              <AddressStep
                addresses={allAddresses}
                selectedAddressId={selectedAddressId}
                isAddingNew={isAddingNewAddress}
                newAddressForm={newAddressForm}
                onSelectAddress={selectAddress}
                onToggleAddNew={toggleAddNewAddress}
                onUpdateNewAddressForm={updateNewAddressForm}
                onSaveNewAddress={saveNewAddress}
                onContinue={() => {
                  void persistSelectedAddressToProfile();
                  setStep('payment');
                }}
              />
            ) : null}

            {step === 'payment' ? (
              <PaymentStep
                paymentMethod={paymentMethod}
                cardDetails={cardDetails}
                hasValidationError={validationError}
                onSelectPaymentMethod={setPaymentMethod}
                onUpdateCard={updateCardDetails}
                onContinue={continueFromPayment}
                onBack={() => setStep('address')}
              />
            ) : null}

            {step === 'review' ? (
              <ReviewStep
                selectedAddress={selectedAddress}
                paymentMethod={paymentMethod}
                cartItems={cartItems}
                subtotal={subtotalValue}
                tax={tax}
                total={total}
                isPlacingOrder={createOrderMutation.isPending}
                onChangeAddress={() => setStep('address')}
                onChangePayment={() => setStep('payment')}
                onPlaceOrder={placeOrder}
              />
            ) : null}
          </div>

          <aside
            className="h-max rounded-xl border border-[var(--color-border)] bg-white p-4 lg:sticky lg:top-[calc(var(--navbar-height)+24px)]"
            style={{ minHeight: 240 }}
          >
            <h3 className="text-lg font-bold">Order Summary</h3>
            <div className="mt-3 space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-2">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">{item.product.name}</p>
                    <p className="text-[11px] text-[var(--color-text-muted)]">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Subtotal</span>
                <span>${subtotalValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-[var(--color-border)] pt-2 font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>

        <OrderConfirmationModal
          isOpen={showConfirmation}
          orderId={orderId}
          estimatedDelivery="Monday, February 23, 2026"
          onTrackOrder={() => {
            setShowConfirmation(false);
            reset();
            navigate(`/order-tracking?orderId=${orderId}`);
          }}
          onContinueShopping={() => {
            setShowConfirmation(false);
            reset();
            navigate('/home');
          }}
        />
      </div>
    </AppLayout>
  );
}
