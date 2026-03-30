import { create } from 'zustand';
import type { ProductOut } from '@/api-sdk';

interface CompareState {
  items: ProductOut[];
  addToCompare: (product: ProductOut) => boolean;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
  isInCompare: (productId: number) => boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  items: [],
  addToCompare: product => {
    const state = get();
    if (state.items.length >= 3 || state.items.some(item => item.id === product.id)) return false;
    set({ items: [...state.items, product] });
    return true;
  },
  removeFromCompare: productId =>
    set(state => ({ items: state.items.filter(item => item.id !== productId) })),
  clearCompare: () => set({ items: [] }),
  isInCompare: productId => get().items.some(item => item.id === productId),
}));
