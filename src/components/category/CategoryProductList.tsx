import React, { useState, useMemo } from 'react';
import { useFilteredProducts } from '../../store';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../ui/Button';
import { APP_CONFIG, PRODUCT_CATEGORIES } from '../../utils/constants';
import styles from './CategoryProductList.module.css';

export interface CategoryProductListProps {
  category: string;
}

export const CategoryProductList: React.FC<CategoryProductListProps> = ({ category }) => {
  const filteredProducts = useFilteredProducts();
  const [isExpanded, setIsExpanded] = useState(false);

  const products = useMemo(() => {
    const categoryProducts = filteredProducts.filter(product => product.type === category);
    console.log(`CategoryProductList - ${category} products:`, categoryProducts.length, categoryProducts.map(p => ({ 
      name: p.name, 
      isDiscounted: p.isDiscounted, 
      isTopSelling: p.isTopSelling, 
      isRecentlyAdded: p.isRecentlyAdded, 
      isFrequentlyOrdered: p.isFrequentlyOrdered 
    })));
    return categoryProducts;
  }, [filteredProducts, category]);

  const visibleProducts = useMemo(() => {
    return isExpanded 
      ? products 
      : products.slice(0, APP_CONFIG.ITEMS_PER_PAGE_INITIAL);
  }, [products, isExpanded]);

  const hasMoreProducts = products.length > APP_CONFIG.ITEMS_PER_PAGE_INITIAL;
  const categoryDisplayName = PRODUCT_CATEGORIES[category as keyof typeof PRODUCT_CATEGORIES] || category;

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{categoryDisplayName}</h2>
        <span className={styles.count}>
          {products.length} item{products.length !== 1 ? 's' : ''}
        </span>
      </header>

      <div className={styles.productGrid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMoreProducts && (
        <div className={styles.actions}>
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={`${category}-products`}
          >
            {isExpanded 
              ? `Show Less` 
              : `Show More (${products.length - APP_CONFIG.ITEMS_PER_PAGE_INITIAL} more)`
            }
          </Button>
        </div>
      )}
    </section>
  );
};
