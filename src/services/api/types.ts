import type { Product, ProductCategory, ApiResponse, ApiError } from '../../types';

export interface GetProductsParams {
  category?: ProductCategory;
  limit?: number;
  offset?: number;
  includeOutOfStock?: boolean;
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  categories: ProductCategory[];
}

export interface GetProductDetailParams {
  id: string;
}

export interface ProductServiceInterface {
  getProducts(params?: GetProductsParams): Promise<ApiResponse<GetProductsResponse>>;
  getProductById(params: GetProductDetailParams): Promise<ApiResponse<Product>>;
  getCategories(): Promise<ApiResponse<ProductCategory[]>>;
}