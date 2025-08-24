import { useMemo } from 'react';
import { useFilterStore } from '../store';
import { useDebounce } from './useDebounce';
import { APP_CONFIG } from '../utils/constants';
import type { ProductWithComputedFields } from '../types';

/**
 * Hook for handling product search with debouncing
 * Future enhancement: can be extended for more complex search logic
 */
export const useFilteredProductSearch = (products: ProductWithComputedFields[]) => {
  const { searchQuery } = useFilterStore();
  const debouncedSearchQuery = useDebounce(searchQuery, APP_CONFIG.DEBOUNCE_DELAY);

  const searchResults = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return products;
    }

    const query = debouncedSearchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.type.toLowerCase().includes(query)
    );
  }, [products, debouncedSearchQuery]);

  return {
    searchResults,
    searchQuery: debouncedSearchQuery,
    hasSearchQuery: debouncedSearchQuery.trim().length > 0,
    resultCount: searchResults.length,
  };
};
