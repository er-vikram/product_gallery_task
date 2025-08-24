import React from 'react';
import styles from './ProductPrice.module.css';

export interface ProductPriceProps {
  /** Original price of the product */
  originalPrice: number;
  /** Offer/discounted price (if applicable) */
  offerPrice: number;
  /** Whether the product is currently discounted */
  isDiscounted: boolean;
  /** Currency symbol */
  currency?: string;
  /** Size variant for different contexts */
  size?: 'small' | 'medium' | 'large';
  /** Layout direction */
  layout?: 'horizontal' | 'vertical';
  /** Whether to show discount percentage */
  showDiscountPercentage?: boolean;
  /** Whether to show "Save" amount */
  showSaveAmount?: boolean;
  /** Custom formatter for price display */
  formatter?: (price: number, currency: string) => string;
  /** Additional CSS classes */
  className?: string;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  originalPrice,
  offerPrice,
  isDiscounted,
  currency = '₹',
  size = 'medium',
  layout = 'horizontal',
  showDiscountPercentage = true,
  showSaveAmount = false,
  formatter,
  className = '',
}) => {
  // Calculate discount metrics
  const discountAmount = originalPrice - offerPrice;
  const discountPercentage = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;
  const hasValidDiscount = isDiscounted && discountAmount > 0 && discountPercentage > 0;

  // Format price with custom formatter or default
  const formatPrice = (price: number): string => {
    if (formatter) {
      return formatter(price, currency);
    }
    return `${currency}${price.toLocaleString()}`;
  };

  // Current effective price
  const currentPrice = isDiscounted ? offerPrice : originalPrice;

  const containerClasses = [
    styles.container,
    styles[`size--${size}`],
    styles[`layout--${layout}`],
    hasValidDiscount && styles['container--discounted'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {/* Current Price */}
      <div className={styles.currentPrice}>
        <span className={styles.currencySymbol}>{currency}</span>
        <span className={styles.priceValue}>
          {isDiscounted ? offerPrice.toLocaleString() : originalPrice.toLocaleString()}
        </span>
      </div>

      {/* Original Price (crossed out when discounted) */}
      {hasValidDiscount && (
        <div className={styles.originalPrice}>
          <span className={styles.strikethrough} aria-label={`Original price was ${formatPrice(originalPrice)}`}>
            {formatPrice(originalPrice)}
          </span>
        </div>
      )}

      {/* Discount Information */}
      {hasValidDiscount && (
        <div className={styles.discountInfo}>
          {/* Discount Percentage */}
          {showDiscountPercentage && (
            <span className={styles.discountBadge} aria-label={`${discountPercentage} percent discount`}>
              {discountPercentage}% OFF
            </span>
          )}

          {/* Save Amount */}
          {showSaveAmount && (
            <span className={styles.saveAmount} aria-label={`You save ${formatPrice(discountAmount)}`}>
              Save {formatPrice(discountAmount)}
            </span>
          )}
        </div>
      )}

      {/* Screen reader only discount announcement */}
      {hasValidDiscount && (
        <span className={styles.srOnly}>
          Discounted price: {formatPrice(offerPrice)}, 
          originally {formatPrice(originalPrice)}, 
          you save {discountPercentage} percent
        </span>
      )}
    </div>
  );
};

/**
 * ProductPriceRange - For products with price ranges (future enhancement)
 */
interface ProductPriceRangeProps {
  minPrice: number;
  maxPrice: number;
  currency?: string;
  size?: ProductPriceProps['size'];
  formatter?: ProductPriceProps['formatter'];
  className?: string;
}

export const ProductPriceRange: React.FC<ProductPriceRangeProps> = ({
  minPrice,
  maxPrice,
  currency = '₹',
  size = 'medium',
  formatter,
  className = '',
}) => {
  const formatPrice = (price: number): string => {
    if (formatter) {
      return formatter(price, currency);
    }
    return `${currency}${price.toLocaleString()}`;
  };

  const containerClasses = [
    styles.container,
    styles[`size--${size}`],
    styles.priceRange,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <span className={styles.priceRangeText} aria-label={`Price range from ${formatPrice(minPrice)} to ${formatPrice(maxPrice)}`}>
        {formatPrice(minPrice)} - {formatPrice(maxPrice)}
      </span>
    </div>
  );
};

/**
 * Utility function to calculate bulk pricing discounts (future enhancement)
 */
export const calculateBulkDiscount = (
  quantity: number,
  unitPrice: number,
  discountTiers: Array<{ minQuantity: number; discountPercentage: number }>
): { totalPrice: number; discountApplied: number; savings: number } => {
  const applicableTier = discountTiers
    .filter(tier => quantity >= tier.minQuantity)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)[0];

  if (!applicableTier) {
    return {
      totalPrice: quantity * unitPrice,
      discountApplied: 0,
      savings: 0,
    };
  }

  const discountAmount = (unitPrice * applicableTier.discountPercentage) / 100;
  const discountedUnitPrice = unitPrice - discountAmount;
  const totalPrice = quantity * discountedUnitPrice;
  const savings = quantity * discountAmount;

  return {
    totalPrice,
    discountApplied: applicableTier.discountPercentage,
    savings,
  };
};