import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api-sdk';

export function useOrdersQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}
