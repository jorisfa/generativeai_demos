import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

interface CardBlockProps {
  variant: 'positive' | 'info' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

const CardBlock: React.FC<CardBlockProps> = ({ variant, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100); // Delay for effect
    return () => clearTimeout(timeout);
  }, []); 

  const CardBlockClasses = clsx(
    'p-4 rounded-lg shadow-md transform transition-all duration-500', // Base styles + animation setup
    {
      'bg-green-500 text-white': variant === 'positive',
      'bg-white text-gray-800': variant === 'info',
      'bg-yellow-200 text-yellow-800': variant === 'warning',
      'bg-red-200 text-red-800': variant === 'danger',
    },
    className,
    {
      'opacity-0 translate-y-4 scale-0': !isVisible, // Initial state (hidden)
      'opacity-100 translate-y-0 scale-100': isVisible, // Final state (visible)
    }
  );

  return <div className={`${CardBlockClasses}`}>{children}</div>;
};

export default CardBlock;
