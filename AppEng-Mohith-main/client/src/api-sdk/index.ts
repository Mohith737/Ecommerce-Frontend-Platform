import { apiRequest } from './client';
import type {
  CartItemAdd,
  CartItemOut,
  CategoryOut,
  CategoryWithSubCategories,
  CreateOrderRequest,
  LoginRequest,
  OrderOut,
  PaginatedProducts,
  ProductOut,
  RegisterRequest,
  ReviewCreate,
  ReviewOut,
  SubCategoryOut,
  SubCategoryWithProducts,
  TokenResponse,
  UserOut,
  UserUpdate,
  WishlistItemOut,
} from './types';

export type {
  CartItemAdd,
  CartItemOut,
  CategoryOut,
  CategoryWithSubCategories,
  CreateOrderRequest,
  LoginRequest,
  OrderOut,
  PaginatedProducts,
  ProductOut,
  RegisterRequest,
  ReviewCreate,
  ReviewOut,
  SubCategoryOut,
  SubCategoryWithProducts,
  TokenResponse,
  UserOut,
  UserUpdate,
  WishlistItemOut,
};

export type { CategoryWithSubs } from './types';

export interface ProductsQuery {
  skip?: number;
  limit?: number;
  subcategory_id?: number;
  category_id?: number;
  price_min?: number;
  price_max?: number;
  rating_min?: number;
}

function buildQuery(params: Record<string, unknown>): string {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      qs.set(key, String(value));
    }
  });
  const query = qs.toString();
  return query ? `?${query}` : '';
}

export async function register(body: RegisterRequest): Promise<TokenResponse> {
  return apiRequest<TokenResponse>('/auth/register', { method: 'POST', body });
}

export async function login(body: LoginRequest): Promise<TokenResponse> {
  return apiRequest<TokenResponse>('/auth/login', { method: 'POST', body });
}

export async function getUserProfile(): Promise<UserOut> {
  return apiRequest<UserOut>('/users/profile', { requiresAuth: true });
}

export const getProfile = getUserProfile;

export async function updateUserProfile(body: UserUpdate): Promise<UserOut> {
  return apiRequest<UserOut>('/users/profile', {
    method: 'PUT',
    body,
    requiresAuth: true,
  });
}

export const updateProfile = updateUserProfile;

export async function getProducts(query: ProductsQuery = {}): Promise<PaginatedProducts> {
  return apiRequest<PaginatedProducts>(`/products/${buildQuery(query as Record<string, unknown>)}`);
}

export async function getDemoProducts(): Promise<ProductOut[]> {
  return apiRequest<ProductOut[]>('/products/demo');
}

export async function searchProducts(
  q: string,
  params: Omit<ProductsQuery, 'category_id' | 'rating_min'> = {}
): Promise<PaginatedProducts> {
  return apiRequest<PaginatedProducts>(`/products/search${buildQuery({ q, ...params })}`);
}

export async function getProduct(productId: number): Promise<ProductOut> {
  return apiRequest<ProductOut>(`/products/${productId}`);
}

export async function getProductReviews(productId: number): Promise<ReviewOut[]> {
  return apiRequest<ReviewOut[]>(`/products/${productId}/reviews`);
}

export async function addProductReview(productId: number, body: ReviewCreate): Promise<ReviewOut> {
  return apiRequest<ReviewOut>(`/products/${productId}/reviews`, {
    method: 'POST',
    body,
    requiresAuth: true,
  });
}

export async function getCategories(): Promise<CategoryOut[]> {
  return apiRequest<CategoryOut[]>('/categories/');
}

export async function getCategory(categoryId: number): Promise<CategoryWithSubCategories> {
  return apiRequest<CategoryWithSubCategories>(`/categories/${categoryId}`);
}

export async function getCategoryProducts(
  categoryId: number,
  params: { skip?: number; limit?: number } = {}
): Promise<PaginatedProducts> {
  return apiRequest<PaginatedProducts>(
    `/categories/${categoryId}/products${buildQuery(params as Record<string, unknown>)}`
  );
}

export async function getSubcategories(categoryId?: number): Promise<SubCategoryOut[]> {
  const query = buildQuery({ category_id: categoryId });
  return apiRequest<SubCategoryOut[]>(`/subcategories/${query}`);
}

export async function getSubcategory(subcategoryId: number): Promise<SubCategoryWithProducts> {
  return apiRequest<SubCategoryWithProducts>(`/subcategories/${subcategoryId}`);
}

export async function getCart(): Promise<CartItemOut[]> {
  return apiRequest<CartItemOut[]>('/cart/', { requiresAuth: true });
}

export async function addToCart(body: CartItemAdd): Promise<CartItemOut> {
  return apiRequest<CartItemOut>('/cart/', {
    method: 'POST',
    body,
    requiresAuth: true,
  });
}

export async function removeFromCart(itemId: number): Promise<void> {
  return apiRequest<void>(`/cart/${itemId}`, {
    method: 'DELETE',
    requiresAuth: true,
  });
}

export async function getOrders(): Promise<OrderOut[]> {
  return apiRequest<OrderOut[]>('/orders/', { requiresAuth: true });
}

export async function createOrder(body: CreateOrderRequest): Promise<OrderOut> {
  return apiRequest<OrderOut>('/orders/', {
    method: 'POST',
    body,
    requiresAuth: true,
  });
}

export async function getOrder(orderId: number): Promise<OrderOut> {
  return apiRequest<OrderOut>(`/orders/${orderId}`, { requiresAuth: true });
}

export async function getWishlist(): Promise<WishlistItemOut[]> {
  return apiRequest<WishlistItemOut[]>('/wishlist/', { requiresAuth: true });
}

export async function addToWishlist(productId: number): Promise<WishlistItemOut> {
  return apiRequest<WishlistItemOut>('/wishlist/', {
    method: 'POST',
    body: { product_id: productId },
    requiresAuth: true,
  });
}

export async function removeFromWishlist(productId: number): Promise<void> {
  return apiRequest<void>(`/wishlist/${productId}`, {
    method: 'DELETE',
    requiresAuth: true,
  });
}
