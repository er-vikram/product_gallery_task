import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductListPage, ProductDetailPage, NotFoundPage } from './pages';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ROUTES } from './utils/constants';
import "./styles.css";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Routes>
            <Route path={ROUTES.HOME} element={<ProductListPage />} />
            <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
