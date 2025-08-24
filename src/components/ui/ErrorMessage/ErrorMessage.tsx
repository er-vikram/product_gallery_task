import React from 'react';
import { Button } from '../Button';
import styles from './ErrorMessage.module.css';

export interface ErrorMessageProps {
  message?: string | null;
  title?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'Something went wrong',
  title = 'Error',
  onRetry,
  retryLabel = 'Try Again',
  className = '',
}) => {
  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.icon}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {message && (
          <p className={styles.message}>{message}</p>
        )}
        
        {onRetry && (
          <div className={styles.actions}>
            <Button 
              variant="primary" 
              size="medium" 
              onClick={onRetry}
            >
              {retryLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
