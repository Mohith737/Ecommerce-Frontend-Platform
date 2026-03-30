/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { addToCart, getCart, removeFromCart, type CartItemOut } from '@/api-sdk';
import { useAuth } from './AuthProvider';
import { useToast } from '@/design-system/ui/molecules';

interface CartState {
  items: CartItemOut[];
  isLoading: boolean;
  isOpen: boolean;
}

interface CartContextType extends CartState {
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  totalPrice: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [state, setState] = useState<CartState>({ items: [], isLoading: false, isOpen: false });

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setState(prev => ({ ...prev, items: [] }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const items = await getCart();
      setState(prev => ({ ...prev, items }));
    } catch {
      setState(prev => ({ ...prev, items: [] }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      void refreshCart();
    }
  }, [isAuthenticated, refreshCart]);

  const addItem = useCallback(
    async (productId: number, quantity = 1) => {
      if (!isAuthenticated) {
        showToast({ message: 'Sign in to save your cart', type: 'info' });
        return;
      }
      await addToCart({ product_id: productId, quantity });
      await refreshCart();
    },
    [isAuthenticated, refreshCart, showToast]
  );

  const removeItem = useCallback(
    async (itemId: number) => {
      if (!isAuthenticated) return;
      await removeFromCart(itemId);
      await refreshCart();
    },
    [isAuthenticated, refreshCart]
  );

  const value = useMemo<CartContextType>(
    () => ({
      ...state,
      openCart: () => setState(prev => ({ ...prev, isOpen: true })),
      closeCart: () => setState(prev => ({ ...prev, isOpen: false })),
      addItem,
      removeItem,
      refreshCart,
      totalPrice: state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      itemCount: state.items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    [state, addItem, removeItem, refreshCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
