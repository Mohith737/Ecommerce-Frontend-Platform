# PROMPT OF3 — Cart All States (Default/Empty/Coupon)

## Build
- Route: `/#/cart` (protected)
- Implement states: default, empty, coupon idle/valid/incorrect/invalid
- Coupon rule: `WCM10` = 10% off only if first order (`getOrders().length === 0`)

## Required additions
- Store: `src/stores/cartStore.ts`
- Hooks: `src/features/cart/hooks/useCartQuery.ts`, `useOrdersQuery.ts`
- Components:
  - `CartItemRow`
  - `OrderSummary`
  - `DeliveryInfo`
  - `EmptyCart`
- Container: `src/features/cart/containers/CartContainer.tsx`
- Feature export: `src/features/cart/index.ts`
- Page: `src/pages/Cart.tsx`
- Route addition in `src/routes/index.tsx`
- Navbar cart badge using `useCartStore(state => state.itemCount())`

## Cart data-testids
- `cart-page`, `empty-cart`, `continue-shopping-btn`
- `cart-item-{id}`, `quantity-decrease-{id}`, `quantity-increase-{id}`, `remove-item-{id}`
- `coupon-input`, `apply-coupon-btn`, `remove-coupon-btn`
- `coupon-success`, `coupon-error`, `order-summary`, `delivery-info`, `proceed-to-checkout-btn`

## Tests
- `tests/pages/CartPage.ts`
- `tests/cart.spec.ts`
