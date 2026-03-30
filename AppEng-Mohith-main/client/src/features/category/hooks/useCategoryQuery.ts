import { useQuery } from '@tanstack/react-query';
import { getCategory } from '@/api-sdk';

export function useCategoryQuery(categoryId: number) {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategory(categoryId),
    enabled: categoryId > 0,
    staleTime: 1000 * 60 * 5,
  });
}
