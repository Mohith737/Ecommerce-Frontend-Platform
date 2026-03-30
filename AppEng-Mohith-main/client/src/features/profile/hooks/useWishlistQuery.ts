import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '@/api-sdk';

export function useWishlistQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(),
    enabled,
    staleTime: 1000 * 60 * 2,
  });
}
