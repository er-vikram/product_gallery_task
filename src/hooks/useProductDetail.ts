import { useState, useEffect, useCallback } from 'react';
import { useProductActions } from '../store';
import { enrichProduct } from '../utils/helpers';
import { ERROR_MESSAGES } from '../utils/constants';
import type { ProductWithComputedFields, LoadingState } from '../types';
import productService from '../services/api/productService';

interface UseProductDetailState {
  product: ProductWithComputedFields | null;
  loadingState: LoadingState;
  error: string | null;
}

/**
 * Hook for fetching individual product details
 * First checks store cache, then fetches from service if needed
 */
export const useProductDetail = (productId: string) => {
  const { getProductById } = useProductActions();
  
  const [state, setState] = useState<UseProductDetailState>({
    product: null,
    loadingState: 'idle',
    error: null,
  });

  const fetchProductDetail = useCallback(async (id: string) => {
    try {
      setState(prev => ({ ...prev, loadingState: 'loading', error: null }));

      // First, check if product exists in store
      const cachedProduct = getProductById(id);
      if (cachedProduct) {
        setState({
          product: cachedProduct,
          loadingState: 'succeeded',
          error: null,
        });
        return;
      }

      // If not in store, fetch from service
      const response = await productService.getProductById({ id });
      
      if (response.success && response.data) {
        const enrichedProduct = enrichProduct(response.data);
        setState({
          product: enrichedProduct,
          loadingState: 'succeeded',
          error: null,
        });
      } else {
        throw new Error(response.error || ERROR_MESSAGES.PRODUCT_NOT_FOUND);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC;
      setState({
        product: null,
        loadingState: 'failed',
        error: errorMessage,
      });
      console.error('useProductDetail: Failed to fetch product:', err);
    }
  }, [getProductById]);

  const retry = useCallback(() => {
    if (productId) {
      fetchProductDetail(productId);
    }
  }, [productId, fetchProductDetail]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Fetch product when ID changes
  useEffect(() => {
    if (productId) {
      fetchProductDetail(productId);
    } else {
      setState({
        product: null,
        loadingState: 'idle',
        error: null,
      });
    }
  }, [productId, fetchProductDetail]);

  return {
    // Data
    product: state.product,
    
    // State
    isLoading: state.loadingState === 'loading',
    isIdle: state.loadingState === 'idle',
    isSuccess: state.loadingState === 'succeeded',
    isError: state.loadingState === 'failed',
    error: state.error,
    
    // Actions
    retry,
    clearError,
    
    // Computed
    hasProduct: !!state.product,
  };
};
