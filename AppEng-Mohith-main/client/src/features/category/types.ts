import type { CategoryOut, ProductOut } from '@/api-sdk';

export interface SubCategory {
  id: number;
  name: string;
  itemCount: number;
  imageUrl: string;
}

export interface CategoryPageData {
  category: CategoryOut;
  subcategories: SubCategory[];
  featuredProducts: ProductOut[];
}
