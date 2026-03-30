import { useInfiniteQuery } from '@tanstack/react-query';
import { searchProducts } from '@/api-sdk';

export function useSearchResultsQuery(query: string) {
  return useInfiniteQuery({
    queryKey: ['search', 'infinite', query],
    queryFn: ({ pageParam }) => searchProducts(query, { skip: pageParam as number, limit: 20 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.reduce((sum, pageData) => sum + pageData.items.length, 0);
      return fetched < lastPage.total ? fetched : undefined;
    },
    enabled: query.trim().length >= 2,
    staleTime: 1000 * 60 * 2,
  });
}
