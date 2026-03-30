import { useQuery } from '@tanstack/react-query';
import { getDemoProducts } from '@/api-sdk';

export function useDemoProductsQuery() {
  return useQuery({
    queryKey: ['demo-products'],
    queryFn: () => getDemoProducts(),
    staleTime: 1000 * 60 * 5,
  });
}
