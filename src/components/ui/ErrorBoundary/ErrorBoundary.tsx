import React from 'react';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Fallback component to render when error occurs */
  fallback?: React.ComponentType<ErrorFallbackProps>;
  /** Callback fired when error occurs */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Whether to show error details (useful for development) */
  showErrorDetails?: boolean;
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  resetError: () => void;
  showErrorDetails?: boolean;
}

/**
 * ErrorBoundary component - Catches JavaScript errors in component tree
 * 
 * Design Decisions:
 * 1. Implements React error boundary pattern for graceful error handling
 * 2. Provides customizable fallback UI via props
 * 3. Includes error reporting capability via onError callback
 * 4. Development-friendly with optional error details
 * 5. Responsive design with proper accessibility
 * 
 * Scalability Features:
 * - Easy to integrate error reporting services (Sentry, LogRocket, etc.)
 * - Customizable fallback components for different error scenarios
 * - Development vs production modes
 * - Automatic error recovery mechanisms
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state to show error UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details
    this.setState({ errorInfo });
    
    // Report error to external service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
          showErrorDetails={this.props.showErrorDetails}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Default error fallback component
 */
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError
}) => {
  return (
    <div className={styles.errorContainer}>
      <Card variant="outlined" className={styles.errorCard}>
        <div className={styles.errorIcon}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        
        <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
        
        <p className={styles.errorMessage}>
          We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
        </p>
        
        <div className={styles.errorActions}>
          <Button onClick={resetError} variant="primary">
            Try Again
          </Button>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
          >
            Refresh Page
          </Button>
        </div>
      </Card>
    </div>
  );
};

/**
 * HOC for wrapping components with error boundary
 */
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: T) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Hook for error handling in functional components
 */
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);
  
  const resetError = React.useCallback(() => {
    setError(null);
  }, []);
  
  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);
  
  // Throw error to be caught by nearest error boundary
  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  
  return { captureError, resetError };
};

// Custom error classes for different error types
export class ProductNotFoundError extends Error {
  constructor(productId: string) {
    super(`Product with ID "${productId}" was not found`);
    this.name = 'ProductNotFoundError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network request failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  constructor(field: string, message: string) {
    super(`Validation failed for ${field}: ${message}`);
    this.name = 'ValidationError';
  }
}