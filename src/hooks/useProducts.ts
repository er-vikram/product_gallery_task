import { useEffect, useCallback, useRef } from 'react';
import { useProductStore, useStore } from '../store';
import { enrichProduct, filterProducts } from '../utils/helpers';
import { ERROR_MESSAGES } from '../utils/constants';
import productService from '../services/api/productService';
import type { GetProductsParams } from '../services/api/types';

/**
 * Hook for fetching and managing products with automatic filtering
 * Integrates service layer with Zustand store
 */
export const useProducts = (params?: GetProductsParams) => {
  const {
    products,
    filteredProducts,
    categories,
    loadingState,
    error,
    setProducts,
    setLoadingState,
    setError,
    clearError,
  } = useProductStore();

  const { activeFilters } = useStore(state => ({ activeFilters: state.activeFilters }));
  
  // Track if initial fetch has been attempted
  const hasFetchedRef = useRef(false);
  const paramsRef = useRef(params);

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchProducts = useCallback(async (fetchParams?: GetProductsParams) => {
    try {
      setLoadingState('loading');
      clearError();

      const response = await productService.getProducts(fetchParams);
      
      if (response.success && response.data) {
        // Enrich products with computed fields
        const enrichedProducts = response.data.products.map(enrichProduct);
        setProducts(enrichedProducts);
        setLoadingState('succeeded');
      } else {
        throw new Error(response.error || ERROR_MESSAGES.LOADING_FAILED);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC;
      setError(errorMessage);
      console.error('useProducts: Failed to fetch products:', err);
    }
  }, [setProducts, setLoadingState, setError, clearError]);

  // Retry function for error recovery
  const retry = useCallback(() => {
    fetchProducts(paramsRef.current);
  }, [fetchProducts]);

  // Refetch function for manual refresh
  const refetch = useCallback((newParams?: GetProductsParams) => {
    const finalParams = newParams || paramsRef.current;
    paramsRef.current = finalParams;
    return fetchProducts(finalParams);
  }, [fetchProducts]);

  // Initial fetch effect
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      paramsRef.current = params;
      fetchProducts(params);
    }
  }, []); // Empty dependency - only run once

  // Update params reference when they change
  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  return {
    // Data
    products,
    filteredProducts,
    categories,
    
    // State
    isLoading: loadingState === 'loading',
    isIdle: loadingState === 'idle',
    isSuccess: loadingState === 'succeeded',
    isError: loadingState === 'failed',
    error,
    
    // Actions
    refetch,
    retry,
    clearError,
    
    // Computed
    hasProducts: products.length > 0,
    hasFilteredProducts: filteredProducts.length > 0,
  };
};
