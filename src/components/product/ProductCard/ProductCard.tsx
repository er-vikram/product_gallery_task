import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../ui/Card/Card';
import { Button } from '../../ui/Button/Button';
import { ProductImage } from '../ProductImage/ProductImage';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import { getProductDetailRoute } from '../../../utils/helpers';
import styles from './ProductCard.module.css';
import type { ProductWithComputedFields } from '../../../types';

export interface ProductCardProps {
  /** Product data */
  product: ProductWithComputedFields;
  /** Size variant for different layouts */
  size?: 'compact' | 'standard' | 'expanded';
  /** Whether the card is in loading state */
  isLoading?: boolean;
  /** Whether to show additional product metadata */
  showMetadata?: boolean;
  /** Whether to show quick action buttons */
  showActions?: boolean;
  /** Custom image aspect ratio */
  imageAspectRatio?: '1:1' | '4:3' | '3:2' | '16:9';
  /** Additional CSS classes */
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  size = 'standard',
  isLoading = false,
  showMetadata = true,
  showActions = true,
  imageAspectRatio = '1:1',
  className = '',
}) => {
  const navigate = useNavigate();

  // Memoize computed values for performance
  const computedValues = useMemo(() => {
    const isCompact = size === 'compact';
    const isExpanded = size === 'expanded';
    const shouldShowMetadata = showMetadata && !isCompact;
    const shouldShowActions = showActions && (size === 'standard' || isExpanded);
    
    return {
      isCompact,
      isExpanded,
      shouldShowMetadata,
      shouldShowActions,
    };
  }, [size, showMetadata, showActions]);

  // Handle card click - navigate to product detail
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(getProductDetailRoute(product.id));
  };

  // Handle keyboard navigation
  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(getProductDetailRoute(product.id));
    }
  };

  // Handle action button clicks (future implementation)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Add to cart:', product.id);
    // TODO: Implement cart functionality
  };

  const cardClasses = [
    styles.productCard,
    styles[`size--${size}`],
    styles['clickable'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cardVariant = computedValues.isExpanded ? 'elevated' : 'default';
  const cardPadding = computedValues.isCompact ? 'small' : 'medium';

  const discountPercentage = product.isDiscounted 
    ? Math.round(((product.originalPrice - product.offerPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      variant={cardVariant}
      padding={cardPadding}
      interactive={true}
      isLoading={isLoading}
      className={cardClasses}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      aria-label={`${product.name} - ${product.displayPrice} rupees${product.isDiscounted ? ', discounted' : ''}`}
    >
      {/* Product Image */}
      <div className={styles.imageContainer}>
        <ProductImage
          src={product.imgUrl}
          alt={product.name}
          aspectRatio={imageAspectRatio}
          size={computedValues.isCompact ? 'small' : 'medium'}
          className={styles.productImage}
        />

        {/* Discount Badge */}
        {product.isDiscounted && (
          <div className={styles.discountBadge} aria-hidden="true">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Status Tags */}
        <div className={styles.statusTags}>
          {product.isTopSelling && (
            <span className={styles.statusTag} data-status="top-selling">
              🔥 Top Selling
            </span>
          )}
          {product.isRecentlyAdded && (
            <span className={styles.statusTag} data-status="recently-added">
              ✨ New
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        {/* Product Name */}
        <h3 className={styles.productName} title={product.name}>
          {product.name}
        </h3>

        {/* Product Type (Category) */}
        {computedValues.shouldShowMetadata && (
          <div className={styles.productMeta}>
            <span className={styles.productCategory}>
              {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
            </span>
          </div>
        )}

        {/* Price */}
        <div className={styles.priceContainer}>
          <ProductPrice
            originalPrice={product.originalPrice}
            offerPrice={product.offerPrice}
            isDiscounted={product.isDiscounted}
            size={computedValues.isCompact ? 'small' : 'medium'}
            showDiscountPercentage={false} // We show it as badge instead
          />
        </div>

        {/* Quick Actions */}
        {computedValues.shouldShowActions && (
          <div className={styles.actions}>
            <Button
              variant="primary"
              size={computedValues.isCompact ? 'small' : 'medium'}
              fullWidth={!computedValues.isExpanded}
              onClick={handleAddToCart}
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="m1 1 4 4 2.5 11h9.5l3-7H6" />
                </svg>
              }
            >
              {computedValues.isExpanded ? 'Add to Cart' : 'Add'}
            </Button>

            {computedValues.isExpanded && (
              <Button
                variant="outline"
                size="medium"
                onClick={handleCardClick}
              >
                View Details
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * ProductCardSkeleton - Loading state component
 */
export const ProductCardSkeleton: React.FC<{
  size?: ProductCardProps['size'];
  count?: number;
  className?: string;
}> = ({ 
  size = 'standard', 
  count = 1,
  className = '' 
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Card
      key={index}
      variant="default"
      padding={size === 'compact' ? 'small' : 'medium'}
      className={`${styles.productCard} ${styles[`size--${size}`]} ${styles.skeleton} ${className}`}
    >
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonImage} />
        <div className={styles.skeletonText}>
          <div className={styles.skeletonLine} style={{ width: '70%' }} />
          <div className={styles.skeletonLine} style={{ width: '50%' }} />
          {size !== 'compact' && (
            <div className={styles.skeletonLine} style={{ width: '60%' }} />
          )}
        </div>
      </div>
    </Card>
  ));

  return count === 1 ? skeletons[0] : <>{skeletons}</>;
};
