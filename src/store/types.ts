import type { 
    ProductWithComputedFields, 
    FilterType, 
    CategoryExpansionState,
    LoadingState,
    ProductCategory 
  } from '../types';
  
  export interface ProductStore {
    // State
    products: ProductWithComputedFields[];
    filteredProducts: ProductWithComputedFields[];
    categories: ProductCategory[];
    loadingState: LoadingState;
    error: string | null;
    
    // Actions
    setProducts: (products: ProductWithComputedFields[]) => void;
    setLoadingState: (state: LoadingState) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    
    // Computed selectors
    getProductById: (id: string) => ProductWithComputedFields | undefined;
  }
  
  export interface FilterStore {
    // State
    activeFilters: Set<FilterType>;
    searchQuery: string;
    
    // Actions
    toggleFilter: (filterType: FilterType) => void;
    clearAllFilters: () => void;
    setSearchQuery: (query: string) => void;
  }
  
  export interface UIStore {
    // State
    expandedCategories: CategoryExpansionState;
    
    // Actions
    toggleCategoryExpansion: (category: string) => void;
    setAllCategoriesExpanded: (expanded: boolean) => void;
    resetUIState: () => void;
  }
  
  // Combined store type
  export interface AppStore extends ProductStore, FilterStore, UIStore {}
  