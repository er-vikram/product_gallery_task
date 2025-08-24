import type { Product, ProductWithComputedFields, FilterType } from '../types';
import { TIME_CONSTANTS } from './constants';

/**
 * Transforms a Product to include computed fields
 * This centralizes business logic for derived properties
 */
export const enrichProduct = (product: Product): ProductWithComputedFields => {
  const now = Date.now();
  const lastOrdered = new Date(product.lastOrderedTimeStamp).getTime();
  const timeDiff = now - lastOrdered;
  
  return {
    ...product,
    displayPrice: product.isDiscounted ? product.offerPrice : product.originalPrice,
    isTopSelling: timeDiff <= TIME_CONSTANTS.TOP_SELLING_HOURS * TIME_CONSTANTS.MILLISECONDS_PER_HOUR,
    isRecentlyAdded: timeDiff <= TIME_CONSTANTS.RECENTLY_ADDED_HOURS * TIME_CONSTANTS.MILLISECONDS_PER_HOUR,
    isFrequentlyOrdered: timeDiff <= TIME_CONSTANTS.FREQUENTLY_ORDERED_HOURS * TIME_CONSTANTS.MILLISECONDS_PER_HOUR,
  };
};

/**
 * Filters products based on active filter types
 * Centralized filtering logic for consistency
 */
export const filterProducts = (
  products: ProductWithComputedFields[],
  activeFilters: Set<FilterType>
): ProductWithComputedFields[] => {
  if (activeFilters.size === 0) return products;
  
  return products.filter(product => {
    // Use AND logic - product must match ALL active filters
    const filters = Array.from(activeFilters);
    
    return filters.every(filter => {
      switch (filter) {
        case 'discounted':
          return product.isDiscounted;
        case 'topSelling':
          return product.isTopSelling;
        case 'recentlyAdded':
          return product.isRecentlyAdded;
        case 'frequentlyOrdered':
          return product.isFrequentlyOrdered;
        default:
          return false;
      }
    });
  });
};

/**
 * Groups products by category while maintaining order
 */
export const groupProductsByCategory = (products: ProductWithComputedFields[]) => {
  return products.reduce((acc, product) => {
    if (!acc[product.type]) {
      acc[product.type] = [];
    }
    acc[product.type].push(product);
    return acc;
  }, {} as Record<string, ProductWithComputedFields[]>);
};

/**
 * Generates a product detail route
 */
export const getProductDetailRoute = (productId: string): string => {
  return `/product/${productId}`;
};

/**
 * Formats price with currency
 */
export const formatPrice = (price: number, currency = '₹'): string => {
  return `${currency}${price.toFixed(2)}`;
};

/**
 * Generates unique ID for products (useful for mock data)
 */
export const generateProductId = (name: string, type: string): string => {
  return `${type}_${name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
};

/**
 * Validates if a product is valid
 */
export const isValidProduct = (product: any): product is Product => {
  return (
    typeof product === 'object' &&
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.type === 'string' &&
    typeof product.isDiscounted === 'boolean' &&
    typeof product.offerPrice === 'number' &&
    typeof product.originalPrice === 'number' &&
    typeof product.imgUrl === 'string' &&
    typeof product.lastOrderedTimeStamp === 'string'
  );
};