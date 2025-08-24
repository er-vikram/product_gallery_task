import type { FilterTag, ProductCategory } from '../types';

// App Configuration
export const APP_CONFIG = {
  ITEMS_PER_PAGE_INITIAL: 3,
  DEBOUNCE_DELAY: 300,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  IMAGE_PLACEHOLDER: '/placeholder-product.jpg',
} as const;

// Filter Configuration
export const FILTER_TAGS: FilterTag[] = [
  {
    id: 'discounted',
    label: 'Discounted',
    isActive: false,
  },
  {
    id: 'topSelling',
    label: 'Top Selling',
    isActive: false,
  },
  {
    id: 'recentlyAdded',
    label: 'Recently Added',
    isActive: false,
  },
  {
    id: 'frequentlyOrdered',
    label: 'Frequently Ordered',
    isActive: false,
  },
];

// Category Configuration
export const PRODUCT_CATEGORIES: Record<ProductCategory, string> = {
  fruit: 'Fruits',
  grocery: 'Grocery',
  dairy: 'Dairy Products',
  bakery: 'Bakery Items',
  meat: 'Meat & Seafood',
  beverages: 'Beverages',
} as const;

export const CATEGORY_ORDER: ProductCategory[] = [
  'fruit',
  'grocery',
  'dairy',
  'bakery',
  'meat',
  'beverages',
];

// Time Constants for filtering logic
export const TIME_CONSTANTS = {
  TOP_SELLING_HOURS: 48, // Products ordered in last 2 days
  RECENTLY_ADDED_HOURS: 72, // Products added in last 72 hours
  FREQUENTLY_ORDERED_HOURS: 1, // Products ordered in last 1 hour
  MILLISECONDS_PER_HOUR: 60 * 60 * 1000,
} as const;

// Route Constants
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:id',
  NOT_FOUND: '/404',
} as const;

// API Endpoints (for future API integration)
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCT_DETAIL: '/api/products/:id',
  CATEGORIES: '/api/categories',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  PRODUCT_NOT_FOUND: 'Product not found.',
  LOADING_FAILED: 'Failed to load products.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCTS_LOADED: 'Products loaded successfully.',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  FILTER_STATE: 'productApp_filterState',
  EXPANDED_CATEGORIES: 'productApp_expandedCategories',
  CART: 'productApp_cart', // Future enhancement
} as const;

// CSS Custom Properties (for use in CSS modules)
export const CSS_VARIABLES = {
  // Colors
  PRIMARY: '--color-primary',
  SECONDARY: '--color-secondary',
  SUCCESS: '--color-success',
  ERROR: '--color-error',
  WARNING: '--color-warning',
  
  // Spacing
  SPACING_XS: '--spacing-xs',
  SPACING_SM: '--spacing-sm',
  SPACING_MD: '--spacing-md',
  SPACING_LG: '--spacing-lg',
  SPACING_XL: '--spacing-xl',
  
  // Breakpoints
  MOBILE: '--breakpoint-mobile',
  TABLET: '--breakpoint-tablet',
  DESKTOP: '--breakpoint-desktop',
} as const;
