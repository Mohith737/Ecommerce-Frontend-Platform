export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserOut {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface UserUpdate {
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
}

export interface ProductOut {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  rating: number;
  review_count: number;
  brand: string;
  image_url: string;
  stock: number;
  subcategory_id: number;
  subcategory_name: string;
  category_name: string;
}

export interface PaginatedProducts {
  items: ProductOut[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoryOut {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface CategoryWithSubCategories extends CategoryOut {
  subcategories: SubCategoryOut[];
}

export type CategoryWithSubs = CategoryWithSubCategories;

export interface SubCategoryOut {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category_id: number;
}

export interface SubCategoryWithProducts extends SubCategoryOut {
  products: ProductOut[];
}

export interface CartItemOut {
  id: number;
  product_id: number;
  quantity: number;
  product: ProductOut;
}

export interface CartItemAdd {
  product_id: number;
  quantity: number;
}

export interface ReviewOut {
  id: number;
  product_id: number;
  product_name: string;
  user_id: number;
  reviewer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export interface ReviewCreate {
  rating: number;
  review_text: string;
}

export interface OrderItemIn {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface OrderItemOut {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product_name: string;
  product_image: string;
}

export interface OrderOut {
  id: number;
  user_id: number;
  total: number;
  status: string;
  created_at: string;
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  items: OrderItemOut[];
}

export interface CreateOrderRequest {
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  total?: number | null;
  items?: OrderItemIn[] | null;
}

export interface WishlistItemOut {
  id: number;
  product_id: number;
  product: ProductOut;
}

export interface ApiError {
  detail: string | { loc: string[]; msg: string; type: string }[];
}
