import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ProductImage } from '../components/product/ProductImage';
import { ProductPrice } from '../components/product/ProductPrice';
import { useProductDetail } from '../hooks/useProductDetail';
import { formatCurrency } from '../utils/formatters';
import styles from './ProductDetailPage.module.css';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    product,
    isLoading,
    isError,
    error,
    retry,
  } = useProductDetail(id!);

  const handleGoBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  const handleAddToCart = () => {
    console.log('Add to cart:', product?.id);
    // TODO: Implement cart functionality
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="large" />
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <ErrorMessage 
            message={error || 'Product not found'} 
            onRetry={id ? retry : undefined}
          />
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className={styles.backButton}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const discountPercentage = product.isDiscounted 
    ? Math.round(((product.originalPrice - product.offerPrice) / product.originalPrice) * 100)
    : 0;

  const savings = product.isDiscounted 
    ? product.originalPrice - product.offerPrice 
    : 0;

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navigation}>
        <Button 
          variant="ghost" 
          onClick={handleGoBack}
          leftIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          }
        >
          Back
        </Button>
        
        <div className={styles.breadcrumb}>
          <span className={styles.categoryBreadcrumb}>
            {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
          </span>
          <span className={styles.separator}>›</span>
          <span className={styles.productBreadcrumb}>{product.name}</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Product Image */}
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <ProductImage
              src={product.imgUrl}
              alt={product.name}
              aspectRatio="1:1"
              size="large"
              className={styles.productImage}
            />
            
            {/* Status Badges */}
            <div className={styles.badges}>
              {product.isDiscounted && (
                <div className={styles.discountBadge}>
                  {discountPercentage}% OFF
                </div>
              )}
              {product.isTopSelling && (
                <div className={styles.statusBadge} data-status="top-selling">
                  🔥 Top Selling
                </div>
              )}
              {product.isRecentlyAdded && (
                <div className={styles.statusBadge} data-status="recently-added">
                  ✨ Recently Added
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.infoSection}>
          <header className={styles.productHeader}>
            <h1 className={styles.productName}>{product.name}</h1>
            <div className={styles.categoryTag}>
              {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
            </div>
          </header>

          {/* Price Section */}
          <div className={styles.priceSection}>
            <ProductPrice
              originalPrice={product.originalPrice}
              offerPrice={product.offerPrice}
              isDiscounted={product.isDiscounted}
              size="large"
              showDiscountPercentage={false}
            />
            
            {product.isDiscounted && (
              <div className={styles.savingsInfo}>
                <span className={styles.savingsText}>
                  You save {formatCurrency(savings)}
                </span>
                <span className={styles.discountPercentage}>
                  ({discountPercentage}% off)
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className={styles.detailsSection}>
            <h3 className={styles.sectionTitle}>Product Details</h3>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Category:</span>
                <span className={styles.detailValue}>
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Product ID:</span>
                <span className={styles.detailValue}>{product.id}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Availability:</span>
                <span className={styles.detailValue}>In Stock</span>
              </div>
              {product.isDiscounted && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Offer Valid Until:</span>
                  <span className={styles.detailValue}>Limited Time</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <Button
              variant="primary"
              size="large"
              onClick={handleAddToCart}
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="m1 1 4 4 2.5 11h9.5l3-7H6" />
                </svg>
              }
              fullWidth
            >
              Add to Cart - {formatCurrency(product.displayPrice)}
            </Button>
            
            <Button
              variant="outline"
              size="large"
              fullWidth
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
            >
              Add to Wishlist
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
