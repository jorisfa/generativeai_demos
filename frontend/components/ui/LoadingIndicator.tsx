// LoadingIndicator.tsx (Simplified Example)
import React from 'react';

const LoadingIndicator = ({ className }: { className?: string }) => (
  <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 ${className}`}></div>
);

export default LoadingIndicator;