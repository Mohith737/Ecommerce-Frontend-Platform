import { useQuery } from '@tanstack/react-query';
import { getDemoProducts, type PaginatedProducts } from '@/api-sdk';
import type { UseDemoProductsQueryResult } from '../types';

export const useDemoProductsQuery = (): UseDemoProductsQueryResult => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['demo-products'],
    queryFn: async (): Promise<PaginatedProducts> => {
      const items = await getDemoProducts();
      return {
        items,
        total: items.length,
        skip: 0,
        limit: items.length,
      };
    },
  });

  return {
    data: data ?? null,
    isLoading,
    error: isError ? (error as Error) : null,
    refetch: async () => {
      await refetch();
    },
  };
};
