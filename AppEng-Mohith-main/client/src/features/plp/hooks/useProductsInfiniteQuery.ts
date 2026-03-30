import { useQuery } from '@tanstack/react-query';
import { getProducts, searchProducts } from '@/api-sdk';

export const PRODUCTS_PER_PAGE = 20;

interface UseProductsQueryParams {
  query?: string;
  categoryId?: number;
  subcategoryId?: number;
  priceMin?: number;
  priceMax?: number;
  page: number;
}

export function useProductsInfiniteQuery({
  query = '',
  categoryId,
  subcategoryId,
  priceMin,
  priceMax,
  page,
}: UseProductsQueryParams) {
  const skip = Math.max(0, (page - 1) * PRODUCTS_PER_PAGE);

  return useQuery({
    queryKey: [
      'plp-products',
      query,
      categoryId ?? null,
      subcategoryId ?? null,
      priceMin ?? null,
      priceMax ?? null,
      page,
    ],
    queryFn: () => {
      const request = {
        skip,
        limit: PRODUCTS_PER_PAGE,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        price_min: priceMin,
        price_max: priceMax,
      };

      return query ? searchProducts(query, request) : getProducts(request);
    },
    staleTime: 1000 * 60 * 2,
  });
}
