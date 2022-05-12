import React from 'react';
import { ErrorBoundary as CoreErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ErrorFallback';

const EmptyComponent = () => null;

interface ApiErrorBoundaryProps {
  displayError?: boolean;
}

const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({ children, displayError = true }) => {
  const fallback = displayError ? ErrorFallback : EmptyComponent;
  return <CoreErrorBoundary FallbackComponent={fallback}>{children}</CoreErrorBoundary>;
};

export default ApiErrorBoundary;
