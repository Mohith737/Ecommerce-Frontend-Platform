import { Button } from '@/design-system/ui/atoms';
import { useCart } from '@/providers/CartProvider';
import { useAuth } from '@/providers/AuthProvider';

export function CartDrawer() {
  const { isGuest } = useAuth();
  const cart = useCart();

  if (!cart.isOpen) return null;

  return (
    <div
      className="fixed inset-0"
      style={{ background: 'rgba(0,0,0,0.45)', zIndex: 1100 }}
      onClick={cart.closeCart}
    >
      <aside
        data-testid="cart-drawer"
        className="absolute right-0 top-0 h-full w-full max-w-[400px] flex flex-col"
        style={{
          background: 'var(--color-white)',
          transform: 'translateX(0)',
          transition: 'transform var(--duration-base) var(--ease-default)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <header
          className="p-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <h3>Your Cart ({cart.itemCount})</h3>
          <button onClick={cart.closeCart}>✕</button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.items.length === 0 ? (
            <div className="text-center py-10">
              <p>Your cart is empty</p>
              <Button onClick={() => (window.location.hash = '#/home')}>Start Shopping</Button>
            </div>
          ) : (
            cart.items.map(item => (
              <div
                key={item.id}
                data-testid={`cart-item-${item.id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p>{item.product.name}</p>
                  <p>
                    ${item.product.price.toFixed(2)} × {item.quantity}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        item.quantity <= 1
                          ? cart.removeItem(item.id)
                          : cart.addItem(item.product_id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => cart.addItem(item.product_id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => cart.removeItem(item.id)}>🗑️</button>
              </div>
            ))
          )}
        </div>
        <footer className="p-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <strong>${cart.totalPrice.toFixed(2)}</strong>
          </div>
          <Button
            fullWidth
            onClick={() => {
              cart.closeCart();
              window.location.hash = isGuest ? '#/sign-in' : '#/checkout';
            }}
          >
            {isGuest ? 'Sign In to Checkout' : 'Proceed to Checkout'}
          </Button>
        </footer>
      </aside>
    </div>
  );
}
