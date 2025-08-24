import React from 'react';
import styles from './LoadingSpinner.module.css';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color,
  className = '' 
}) => {
  const spinnerClasses = [
    styles.spinner,
    styles[`spinner--${size}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={spinnerClasses}
      style={color ? { color } : undefined}
      aria-label="Loading..."
      role="status"
    >
      <svg viewBox="0 0 50 50" className={styles.svg}>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
        />
      </svg>
    </div>
  );
};
