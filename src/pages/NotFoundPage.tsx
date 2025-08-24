import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../utils/constants';
import styles from './NotFoundPage.module.css';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>

        <div className={styles.textContent}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Page Not Found</h2>
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            size="large"
            onClick={handleGoHome}
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            size="large"
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
