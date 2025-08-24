import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { createProductSlice } from './slices/productSlice';
import { createFilterSlice } from './slices/filterSlice';
import { createUISlice } from './slices/uiSlice';
import type { AppStore } from './types';

// Create the combined store
export const useStore = create<AppStore>()(
  devtools(
    subscribeWithSelector(
      (...a) => ({
        ...createProductSlice(...a),
        ...createFilterSlice(...a),
        ...createUISlice(...a),
      })
    ),
    {
      name: 'product-app-store', // Name for Redux DevTools
    }
  )
);

// Selector hooks for better performance and cleaner component code
export const useProducts = () => useStore(state => state.products);
export const useFilteredProducts = () => useStore(state => state.filteredProducts);
export const useLoadingState = () => useStore(state => state.loadingState);
export const useError = () => useStore(state => state.error);
export const useCategories = () => useStore(state => state.categories);

export const useActiveFilters = () => useStore(state => state.activeFilters);
export const useHasActiveFilters = () => useStore(state => 
  state.activeFilters.size > 0 || state.searchQuery.trim().length > 0
);
export const useSearchQuery = () => useStore(state => state.searchQuery);

export const useExpandedCategories = () => useStore(state => state.expandedCategories);

// Action hooks
export const useProductActions = () => useStore(state => ({
  setProducts: state.setProducts,
  setLoadingState: state.setLoadingState,
  setError: state.setError,
  clearError: state.clearError,
  getProductById: state.getProductById,
}));

export const useFilterActions = () => useStore(state => ({
  toggleFilter: state.toggleFilter,
  clearAllFilters: state.clearAllFilters,
  setSearchQuery: state.setSearchQuery,
}));

export const useUIActions = () => useStore(state => ({
  toggleCategoryExpansion: state.toggleCategoryExpansion,
  setAllCategoriesExpanded: state.setAllCategoriesExpanded,
  resetUIState: state.resetUIState,
}));

// Combined hooks for convenience
export const useProductStore = () => {
  const products = useProducts();
  const filteredProducts = useFilteredProducts();
  const loadingState = useLoadingState();
  const error = useError();
  const categories = useCategories();
  const actions = useProductActions();
  
  return {
    products,
    filteredProducts,
    loadingState,
    error,
    categories,
    ...actions,
  };
};

export const useFilterStore = () => {
  const activeFilters = useActiveFilters();
  const hasActiveFilters = useHasActiveFilters();
  const searchQuery = useSearchQuery();
  const actions = useFilterActions();
  
  return {
    activeFilters,
    hasActiveFilters,
    searchQuery,
    ...actions,
  };
};

export const useUIStore = () => {
  const expandedCategories = useExpandedCategories();
  const actions = useUIActions();
  
  return {
    expandedCategories,
    ...actions,
  };
};

// Re-export types for easy importing
export type { AppStore, ProductStore, FilterStore, UIStore } from './types';