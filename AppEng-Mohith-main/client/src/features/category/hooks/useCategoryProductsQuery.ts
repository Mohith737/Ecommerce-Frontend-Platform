import { useQuery } from '@tanstack/react-query';
import { getCategoryProducts } from '@/api-sdk';

export function useCategoryProductsQuery(categoryId: number) {
  return useQuery({
    queryKey: ['category-products', categoryId],
    queryFn: () => getCategoryProducts(categoryId, { skip: 0, limit: 20 }),
    enabled: categoryId > 0,
    staleTime: 1000 * 60 * 2,
  });
}
