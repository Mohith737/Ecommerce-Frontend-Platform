import { create } from 'zustand';
import type { ProductOut } from '@/api-sdk';

export interface CartItem {
  id: number;
  productId: number;
  product: ProductOut;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  couponCode: string;
  couponStatus: 'idle' | 'valid' | 'invalid' | 'incorrect';
  couponDiscount: number;
  isFirstOrder: boolean;
  addItem: (product: ProductOut, quantity?: number) => void;
  removeItem: (cartItemId: number) => void;
  updateQuantity: (cartItemId: number, quantity: number) => void;
  clearCart: () => void;
  setCouponCode: (code: string) => void;
  applyCoupon: (code: string, isFirstOrder: boolean) => void;
  resetCoupon: () => void;
  setItems: (items: CartItem[]) => void;
  setIsFirstOrder: (isFirstOrder: boolean) => void;
  subtotal: () => number;
  discount: () => number;
  tax: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  couponCode: '',
  couponStatus: 'idle',
  couponDiscount: 0,
  isFirstOrder: true,
  addItem: (product, quantity = 1) =>
    set(state => {
      const existing = state.items.find(item => item.productId === product.id);
      if (existing) {
        return {
          items: state.items.map(item =>
            item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }

      return {
        items: [...state.items, { id: Date.now(), productId: product.id, product, quantity }],
      };
    }),
  removeItem: cartItemId =>
    set(state => ({ items: state.items.filter(item => item.id !== cartItemId) })),
  updateQuantity: (cartItemId, quantity) =>
    set(state => ({
      items:
        quantity <= 0
          ? state.items.filter(item => item.id !== cartItemId)
          : state.items.map(item => (item.id === cartItemId ? { ...item, quantity } : item)),
    })),
  clearCart: () => set({ items: [], couponCode: '', couponStatus: 'idle', couponDiscount: 0 }),
  setCouponCode: code => set({ couponCode: code }),
  applyCoupon: (code, isFirstOrder) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'WCM10') {
      if (isFirstOrder) {
        set({ couponStatus: 'valid', couponDiscount: 10 });
      } else {
        set({ couponStatus: 'incorrect', couponDiscount: 0 });
      }
      return;
    }

    if (normalized === '') {
      set({ couponStatus: 'idle', couponDiscount: 0 });
      return;
    }

    set({ couponStatus: 'invalid', couponDiscount: 0 });
  },
  resetCoupon: () => set({ couponCode: '', couponStatus: 'idle', couponDiscount: 0 }),
  setItems: items => set({ items }),
  setIsFirstOrder: isFirstOrder => set({ isFirstOrder }),
  subtotal: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  discount: () => {
    const { couponDiscount } = get();
    return couponDiscount > 0 ? (get().subtotal() * couponDiscount) / 100 : 0;
  },
  tax: () => (get().subtotal() - get().discount()) * 0.08,
  total: () => get().subtotal() - get().discount() + get().tax(),
  itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
