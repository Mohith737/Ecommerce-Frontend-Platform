import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart, removeFromCart } from '@/api-sdk';
import { useAuth } from '@/providers/AuthProvider';
import { useCartStore } from '@/stores/cartStore';
import { navigate } from '@/utils/navigate';
import { CartItemRow } from '../components/CartItemRow';
import { DeliveryInfo } from '../components/DeliveryInfo';
import { EmptyCart } from '../components/EmptyCart';
import { OrderSummary } from '../components/OrderSummary';
import { useCartQuery } from '../hooks/useCartQuery';
import { useOrdersQuery } from '../hooks/useOrdersQuery';

export function CartContainer() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const {
    items,
    setItems,
    setIsFirstOrder,
    updateQuantity,
    removeItem,
    couponCode,
    setCouponCode,
    couponStatus,
    applyCoupon,
    resetCoupon,
    subtotal,
    discount,
    tax,
    total,
    isFirstOrder,
  } = useCartStore();

  const cartQuery = useCartQuery(isAuthenticated);
  const ordersQuery = useOrdersQuery(isAuthenticated);

  const syncMutation = useMutation({
    mutationFn: async ({
      mode,
      cartItemId,
      productId,
      quantity,
    }: {
      mode: 'remove' | 'setQuantity';
      cartItemId: number;
      productId: number;
      quantity: number;
    }) => {
      if (mode === 'remove') {
        await removeFromCart(cartItemId);
        return;
      }

      await removeFromCart(cartItemId);
      if (quantity > 0) {
        await addToCart({ product_id: productId, quantity });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await cartQuery.refetch();
    },
  });

  useEffect(() => {
    if (ordersQuery.data) {
      setIsFirstOrder(ordersQuery.data.length === 0);
    }
  }, [isAuthenticated, ordersQuery.data, setIsFirstOrder]);

  useEffect(() => {
    if (!cartQuery.data) return;

    const mapped = cartQuery.data.map(item => ({
      id: item.id,
      productId: item.product_id,
      product: item.product,
      quantity: item.quantity,
    }));

    if (mapped.length > 0 || items.length === 0) {
      setItems(mapped);
    }
  }, [cartQuery.data, items.length, setItems]);

  const handleQuantityChange = (id: number, quantity: number) => {
    const item = items.find(entry => entry.id === id);
    if (!item) return;

    if (!isAuthenticated) {
      updateQuantity(id, quantity);
      return;
    }

    updateQuantity(id, quantity);
    syncMutation.mutate({
      mode: 'setQuantity',
      cartItemId: item.id,
      productId: item.productId,
      quantity,
    });
  };

  const handleRemove = (id: number) => {
    const item = items.find(entry => entry.id === id);
    if (!item) return;

    removeItem(id);
    if (!isAuthenticated) return;

    syncMutation.mutate({
      mode: 'remove',
      cartItemId: item.id,
      productId: item.productId,
      quantity: 0,
    });
  };

  if (items.length === 0) {
    return (
      <div
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        style={{
          minHeight: '52vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <EmptyCart onContinueShopping={() => navigate('/plp')} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-6 sm:px-6 lg:px-8">
      <p className="text-xs text-[var(--color-text-muted)]">Home &gt; Shopping Cart</p>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Shopping Cart</h1>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-3">
          {items.map(item => (
            <CartItemRow
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
          <DeliveryInfo />
        </div>

        <div className="w-full lg:sticky lg:top-[calc(var(--navbar-height)+24px)] lg:w-[380px] lg:min-w-[380px]">
          <OrderSummary
            subtotal={subtotal()}
            discount={discount()}
            tax={tax()}
            total={total()}
            couponCode={couponCode}
            couponStatus={couponStatus}
            onCouponCodeChange={setCouponCode}
            onApplyCoupon={() => applyCoupon(couponCode, isFirstOrder)}
            onRemoveCoupon={resetCoupon}
            onProceedToCheckout={() => {
              if (!isAuthenticated) {
                navigate('/sign-in');
                return;
              }
              navigate('/checkout');
            }}
          />
        </div>
      </div>
    </div>
  );
}
