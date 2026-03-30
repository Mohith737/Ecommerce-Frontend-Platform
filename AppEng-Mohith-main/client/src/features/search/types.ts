export type SearchState = 'idle' | 'searching' | 'results' | 'no-results';

export interface SearchSuggestion {
  id: string;
  query: string;
  category?: string;
}

export interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
}
