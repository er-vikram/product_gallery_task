export { useProducts } from './useProducts';
export { useProductDetail } from './useProductDetail';
export { useDebounce } from './useDebounce';
export { useLocalStorage } from './useLocalStorage';
export { useCategoryProducts } from './useCategoryProducts';
export { useFilteredProductSearch } from './useFilteredProductSearch';

// Re-export store hooks for convenience
export {
  useStore,
  useProductStore,
  useFilterStore,
  useUIStore,
  useProducts as useProductsStore,
  useFilteredProducts,
  useLoadingState,
  useError,
  useCategories,
  useActiveFilters,
  useHasActiveFilters,
  useSearchQuery,
  useExpandedCategories,
  useProductActions,
  useFilterActions,
  useUIActions,
} from '../store';