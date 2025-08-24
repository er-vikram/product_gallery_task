import { useMemo } from 'react';
import { useFilteredProducts, useExpandedCategories } from '../store';
import { groupProductsByCategory } from '../utils/helpers';
import { PRODUCT_CATEGORIES, CATEGORY_ORDER, APP_CONFIG } from '../utils/constants';
import type { ProductCategory, ProductWithComputedFields } from '../types';

interface CategoryProductsData {
  category: ProductCategory;
  displayName: string;
  products: ProductWithComputedFields[];
  visibleProducts: ProductWithComputedFields[];
  isExpanded: boolean;
  hasMore: boolean;
  totalCount: number;
}

/**
 * Hook for managing category-wise product display with show more/less functionality
 */
export const useCategoryProducts = () => {
  const filteredProducts = useFilteredProducts();
  const expandedCategories = useExpandedCategories();

  const categoryData = useMemo<CategoryProductsData[]>(() => {
    const groupedProducts = groupProductsByCategory(filteredProducts);
    
    return CATEGORY_ORDER
      .filter(category => groupedProducts[category]?.length > 0)
      .map(category => {
        const products = groupedProducts[category] || [];
        const isExpanded = expandedCategories[category] ?? false;
        const visibleProducts = isExpanded 
          ? products 
          : products.slice(0, APP_CONFIG.ITEMS_PER_PAGE_INITIAL);

        return {
          category,
          displayName: PRODUCT_CATEGORIES[category],
          products,
          visibleProducts,
          isExpanded,
          hasMore: products.length > APP_CONFIG.ITEMS_PER_PAGE_INITIAL,
          totalCount: products.length,
        };
      });
  }, [filteredProducts, expandedCategories]);

  return {
    categoryData,
    hasCategories: categoryData.length > 0,
    totalProducts: filteredProducts.length,
  };
};
