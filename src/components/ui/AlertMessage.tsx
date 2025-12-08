import React from 'react';

export type AlertVariant = 'error' | 'warning' | 'success' | 'info';

interface AlertMessageProps {
  children: string;
  variant?: AlertVariant;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
 error: "bg-red-50 text-red-500 border-red-600",
  success: "bg-green-50 text-green-700 border-green-600",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-600",
  info: "bg-blue-50 text-blue-700 border-blue-600",
};

export const AlertMessage: React.FC<AlertMessageProps> = ({
  children,
  variant = 'error',
  className = '',
}) => {
  const base = "w-fit px-4 py-1 rounded-lg font-medium text-xs mt-1 border-l-4";

  if (!children) return null;

  return (
    <p
      className={`absolute ${base} ${variantStyles[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      {children}
    </p>
  );
};