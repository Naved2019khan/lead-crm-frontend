// components/ui/AlertMessage.tsx
import React from 'react';

export type AlertVariant = 'error' | 'warning' | 'success' | 'info';

interface AlertMessageProps {
  children: string;
  variant?: AlertVariant;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  success: 'text-green-600 dark:text-green-400',
  info: 'text-blue-600 dark:text-blue-400',
};

export const AlertMessage: React.FC<AlertMessageProps> = ({
  children,
  variant = 'error',
  className = '',
}) => {
  if (!children) return null;

  return (
    <p
      className={`absolute bg-red-100 p-2 rounded-lg  mt-1 text-sm font-medium ${variantStyles[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      {children}
    </p>
  );
};