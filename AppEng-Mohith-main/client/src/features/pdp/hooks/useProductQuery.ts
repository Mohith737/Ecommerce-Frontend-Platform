import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/api-sdk';

export function useProductQuery(productId: number) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    enabled: productId > 0,
    staleTime: 1000 * 60 * 5,
  });
}
