import { useQuery } from '@tanstack/react-query';
import { getProductReviews } from '@/api-sdk';

export function useProductReviewsQuery(productId: number) {
  return useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => getProductReviews(productId),
    enabled: productId > 0,
    staleTime: 1000 * 60 * 2,
  });
}
