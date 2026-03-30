import { create } from 'zustand';
import type { RecentSearch } from '@/features/search/types';

interface SearchStoreState {
  recentSearches: RecentSearch[];
  currentQuery: string;
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (id: string) => void;
  clearRecentSearches: () => void;
  setCurrentQuery: (query: string) => void;
}

export const useSearchStore = create<SearchStoreState>(set => ({
  recentSearches: [
    { id: '1', query: 'wireless headphones', timestamp: Date.now() - 3600000 },
    { id: '2', query: 'laptop dell xps', timestamp: Date.now() - 7200000 },
    { id: '3', query: 'smart watch', timestamp: Date.now() - 86400000 },
  ],
  currentQuery: '',
  addRecentSearch: query =>
    set(state => ({
      recentSearches: [
        { id: String(Date.now()), query, timestamp: Date.now() },
        ...state.recentSearches.filter(item => item.query !== query).slice(0, 4),
      ],
    })),
  removeRecentSearch: id =>
    set(state => ({
      recentSearches: state.recentSearches.filter(item => item.id !== id),
    })),
  clearRecentSearches: () => set({ recentSearches: [] }),
  setCurrentQuery: query => set({ currentQuery: query }),
}));
