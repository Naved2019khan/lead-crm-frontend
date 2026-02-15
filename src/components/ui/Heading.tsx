
import React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingAlign = 'left' | 'center' | 'right';
type HeadingVariant = 'default' | 'gradient' | 'underline' | 'accent';

interface HeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  align?: HeadingAlign;
  variant?: HeadingVariant;
  subtitle?: string;
  className?: string;
  id?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 'h2',
  align = 'left',
  variant = 'default',
  subtitle,
  className = '',
  id,
}) => {
  const Component = level;

  const baseStyles = 'font-bold';
  
  const sizeStyles = {
    h1: 'text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl lg:text-4xl',
    h4: 'text-xl md:text-2xl lg:text-3xl',
    h5: 'text-lg md:text-xl lg:text-2xl',
    h6: 'text-base md:text-lg lg:text-xl',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const variantStyles = {
    default: 'text-gray-900',
    gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent',
    underline: 'text-gray-900 border-b-4 border-indigo-500 pb-2 inline-block',
    accent: 'text-gray-900 relative before:absolute before:bottom-0 before:left-0 before:w-16 before:h-1 before:bg-indigo-500 pb-3',
  };

  const subtitleStyles = {
    h1: 'text-lg md:text-xl',
    h2: 'text-base md:text-lg',
    h3: 'text-sm md:text-base',
    h4: 'text-sm',
    h5: 'text-xs md:text-sm',
    h6: 'text-xs',
  };

  return (
    <div className={`${alignStyles[align]} ${className}`}>
      <Component
        id={id}
        className={`${baseStyles} ${sizeStyles[level]} ${variantStyles[variant]}`}
      >
        {children}
      </Component>
      {subtitle && (
        <p className={`${subtitleStyles[level]} text-gray-600 mt-2`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
