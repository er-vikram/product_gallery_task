import React, { useState, useCallback } from 'react';
import styles from './ProductImage.module.css';

export interface ProductImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Aspect ratio for consistent sizing */
  aspectRatio?: '1:1' | '4:3' | '3:2' | '16:9';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show loading skeleton */
  showSkeleton?: boolean;
  /** Custom placeholder image */
  placeholder?: string;
  /** Callback when image loads successfully */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Priority loading for critical images */
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  aspectRatio = '1:1',
  size = 'medium',
  showSkeleton = false,
  placeholder,
  onLoad,
  onError,
  className = '',
  priority = false,
}) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageSrc, setImageSrc] = useState<string>(src);

  const handleImageLoad = useCallback(() => {
    setImageState('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageState('error');
    
    // Set fallback image if provided
    if (placeholder && imageSrc !== placeholder) {
      setImageSrc(placeholder);
      setImageState('loading'); // Try loading placeholder
      return;
    }
    
    onError?.();
  }, [onError, placeholder, imageSrc]);

  // Reset image state when src changes
  React.useEffect(() => {
    setImageState('loading');
    setImageSrc(src);
  }, [src]);

  const containerClasses = [
    styles.container,
    styles[`aspect--${aspectRatio.replace(':', '-')}`],
    styles[`size--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const shouldShowSkeleton = showSkeleton || imageState === 'loading';
  const shouldShowErrorFallback = imageState === 'error' && !placeholder;

  return (
    <div className={containerClasses}>
      {/* Skeleton loading state */}
      {shouldShowSkeleton && (
        <div className={styles.skeleton} aria-hidden="true">
          <div className={styles.skeletonContent}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {shouldShowErrorFallback && (
        <div className={styles.errorFallback} aria-label={`Failed to load image: ${alt}`}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
          <span className={styles.errorText}>Image unavailable</span>
        </div>
      )}

      {/* Actual image */}
      <img
        src={imageSrc}
        alt={alt}
        className={`${styles.image} ${imageState === 'loaded' ? styles.imageLoaded : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
};

/**
 * ProductImageGallery - For multiple product images (future enhancement)
 */
interface ProductImageGalleryProps {
  images: Array<{ src: string; alt: string }>;
  aspectRatio?: ProductImageProps['aspectRatio'];
  size?: ProductImageProps['size'];
  maxImages?: number;
  onImageClick?: (index: number) => void;
  className?: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  aspectRatio = '1:1',
  size = 'medium',
  maxImages = 4,
  onImageClick,
  className = '',
}) => {
  const displayImages = images.slice(0, maxImages);
  const remainingCount = Math.max(0, images.length - maxImages);

  return (
    <div className={`${styles.gallery} ${className}`}>
      {displayImages.map((image, index) => (
        <div
          key={index}
          className={styles.galleryItem}
          onClick={() => onImageClick?.(index)}
          role={onImageClick ? 'button' : undefined}
          tabIndex={onImageClick ? 0 : undefined}
          onKeyDown={(e) => {
            if (onImageClick && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onImageClick(index);
            }
          }}
        >
          <ProductImage
            src={image.src}
            alt={image.alt}
            aspectRatio={aspectRatio}
            size={size}
            priority={index === 0} // First image gets priority
          />
          
          {/* Show remaining count on last image */}
          {index === maxImages - 1 && remainingCount > 0 && (
            <div className={styles.moreImagesOverlay}>
              +{remainingCount}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
