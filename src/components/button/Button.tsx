// src/components/Button.tsx or components/Button.tsx

import React from 'react';

/**
 * Defines the allowed color schemes/variants for the button.
 */
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/**
 * Defines the props for the Button component.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content to display inside the button.
   */
  children: React.ReactNode;
  /**
   * The visual style of the button. Defaults to 'primary'.
   */
  variant?: ButtonVariant;
  /**
   * If true, the button will be disabled and non-interactive.
   */
  disabled?: boolean;
}

/**
 * Reusable Button component styled with Tailwind CSS.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...rest
}) => {
  // Base styles applied to all buttons
  const baseStyles =
    'px-4 py-2 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50';

  // Styles specific to each variant
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles =
        'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500';
      break;
    case 'secondary':
      variantStyles =
        'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400';
      break;
    case 'danger':
      variantStyles =
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500';
      break;
    case 'ghost':
      variantStyles =
        'bg-transparent text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 focus:ring-indigo-300 border border-indigo-600';
      break;
    default:
      // Fallback to primary if an unknown variant is somehow passed
      variantStyles =
        'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500';
  }

  // Disabled styles override
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  // Combine all styles, allowing the user to pass a className for custom overrides
  const combinedClassName = `${baseStyles} ${variantStyles} ${disabledStyles} ${className}`;

  return (
    <button
      type="button" // Default to button type unless overwritten by {...rest}
      className={combinedClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};