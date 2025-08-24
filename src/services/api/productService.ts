import type { 
  ProductServiceInterface, 
  GetProductsParams, 
  GetProductsResponse,
  GetProductDetailParams 
} from './types';
import type { Product, ProductCategory, ApiResponse } from '../../types';
import { MOCK_PRODUCTS } from '../mock/mockData';
import { enrichProduct, isValidProduct } from '../../utils/helpers';
import { ERROR_MESSAGES } from '../../utils/constants';

/**
 * Production-ready service layer with mock implementation
 * Easily replaceable with real API calls
 */
class ProductService implements ProductServiceInterface {
  private readonly baseDelay = 500; // Simulate network delay
  private readonly maxDelay = 1000;

  /**
   * Simulates network delay for realistic testing
   */
  private async simulateNetworkDelay(): Promise<void> {
    const delay = Math.random() * (this.maxDelay - this.baseDelay) + this.baseDelay;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Get products with optional filtering and pagination
   */
  async getProducts(params: GetProductsParams = {}): Promise<ApiResponse<GetProductsResponse>> {
    try {
      await this.simulateNetworkDelay();

      const {
        category,
        limit = 50,
        offset = 0,
        includeOutOfStock = true
      } = params;

      // Validate and enrich products
      let products = MOCK_PRODUCTS
        .filter(isValidProduct)
        .map(enrichProduct);

      // Apply category filter
      if (category) {
        products = products.filter(product => product.type === category);
      }

      // Apply stock filter - since we don't have stock field, assume all products are in stock
      // This filter would be implemented when stock field is added to Product interface
      if (!includeOutOfStock) {
        // For now, all products are considered in stock
        // Future: products = products.filter(product => product.stock > 0);
      }

      // Apply pagination
      const total = products.length;
      const paginatedProducts = products.slice(offset, offset + limit);
      const hasMore = offset + limit < total;

      // Get unique categories
      const categories = Array.from(
        new Set(MOCK_PRODUCTS.map(product => product.type))
      ) as ProductCategory[];

      const response: GetProductsResponse = {
        products: paginatedProducts,
        total,
        hasMore,
        categories,
      };

      return {
        data: response,
        success: true,
        message: `Successfully loaded ${paginatedProducts.length} products`,
      };

    } catch (error) {
      console.error('ProductService.getProducts error:', error);
      
      return {
        data: {
          products: [],
          total: 0,
          hasMore: false,
          categories: [],
        },
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC,
      };
    }
  }

  /**
   * Get single product by ID
   */
  async getProductById(params: GetProductDetailParams): Promise<ApiResponse<Product>> {
    try {
      await this.simulateNetworkDelay();

      const { id } = params;

      if (!id) {
        throw new Error('Product ID is required');
      }

      const product = MOCK_PRODUCTS.find(p => p.id === id);

      if (!product) {
        return {
          data: {} as Product, // Type assertion for error case
          success: false,
          error: ERROR_MESSAGES.PRODUCT_NOT_FOUND,
        };
      }

      if (!isValidProduct(product)) {
        throw new Error('Invalid product data');
      }

      const enrichedProduct = enrichProduct(product);

      return {
        data: enrichedProduct,
        success: true,
        message: `Product ${product.name} loaded successfully`,
      };

    } catch (error) {
      console.error('ProductService.getProductById error:', error);
      
      return {
        data: {} as Product,
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC,
      };
    }
  }

  /**
   * Get available categories
   */
  async getCategories(): Promise<ApiResponse<ProductCategory[]>> {
    try {
      await this.simulateNetworkDelay();

      const categories = Array.from(
        new Set(MOCK_PRODUCTS.map(product => product.type))
      ) as ProductCategory[];

      return {
        data: categories,
        success: true,
        message: `Successfully loaded ${categories.length} categories`,
      };

    } catch (error) {
      console.error('ProductService.getCategories error:', error);
      
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC,
      };
    }
  }
}

// Create singleton instance
export const productService = new ProductService();

// For easy swapping with real API service
export default productService;
