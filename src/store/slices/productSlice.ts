import { StateCreator } from 'zustand';
import type { ProductStore, AppStore } from '../types';
import type { ProductWithComputedFields, ProductCategory, LoadingState } from '../../types';

export const createProductSlice: StateCreator<
  AppStore,
  [],
  [],
  ProductStore
> = (set, get) => ({
  // Initial State
  products: [],
  filteredProducts: [],
  categories: [],
  loadingState: 'idle',
  error: null,

  // Actions
  setProducts: (products: ProductWithComputedFields[]) => {
    const categories = Array.from(
      new Set(products.map(product => product.type))
    ) as ProductCategory[];
    
    set(state => ({
      products,
      categories,
      filteredProducts: state.activeFilters.size === 0 
        ? products 
        : filterProductsByActiveFilters(products, state.activeFilters)
    }));
  },

  setLoadingState: (loadingState: LoadingState) => 
    set({ loadingState }),

  setError: (error: string | null) => 
    set({ error, loadingState: error ? 'failed' : 'idle' }),

  clearError: () => 
    set({ error: null }),

  // Computed Selectors
  getProductById: (id: string) => {
    const { products } = get();
    return products.find(product => product.id === id);
  },
});

// Helper function for filtering logic
export const filterProductsByActiveFilters = (
  products: ProductWithComputedFields[],
  activeFilters: Set<string>
): ProductWithComputedFields[] => {
  if (activeFilters.size === 0) return products;
  
  const temp = products.filter(product => {
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

  console.log("temp=", temp);
  return temp;
};