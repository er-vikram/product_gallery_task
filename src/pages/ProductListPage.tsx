import React from 'react';
import { FilterTags } from '../components/filters/FilterTags';
import { CategoryProductList } from '../components/category/CategoryProductList';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useProducts } from '../hooks/useProducts';
import styles from './ProductListPage.module.css';


export const ProductListPage: React.FC = () => {
  const {
    isLoading,
    isError,
    error,
    retry,
    categories,
    hasProducts,
  } = useProducts();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <ErrorMessage message={error} onRetry={retry} />
      </div>
    );
  }

  if (!hasProducts) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h2>No products found</h2>
          <p>We couldn't find any products to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Product Catalog</h1>
        <FilterTags />
      </header>

      <main className={styles.main}>
        {categories.map(category => (
          <CategoryProductList 
            key={category} 
            category={category} 
          />
        ))}
      </main>
    </div>
  );
};
