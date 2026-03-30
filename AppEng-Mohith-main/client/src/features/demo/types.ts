import type { PaginatedProducts, RegisterRequest, TokenResponse } from '@/api-sdk';

/**
 * Result type for useDemoProductsQuery hook
 */
export interface UseDemoProductsQueryResult {
  data: PaginatedProducts | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Result type for useRegisterMutation hook
 */
export interface UseRegisterMutationResult {
  mutate: (data: RegisterRequest) => Promise<void>;
  data: TokenResponse | null;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

/**
 * Props for ProductsList component
 */
export interface ProductsListProps {
  data: PaginatedProducts | null;
  isLoading: boolean;
  error: Error | null;
  onRefetch: () => void;
}
