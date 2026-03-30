import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/api-sdk';

export function useCartQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
    enabled,
    staleTime: 1000 * 30,
  });
}
