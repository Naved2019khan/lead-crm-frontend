import React from 'react';

// Define the props interface for type safety
interface EditButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Optional text to display next to the icon
  text?: string;
  // Optional handler for when the button is clicked (in addition to the default onClick)
  onEdit?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ 
  text = 'Edit', 
  onEdit, 
  className = '', 
  children, 
  ...rest 
}) => {
  
  const baseClasses = `
    flex items-center space-x-1.5 
    px-3 py-1.5 rounded-lg 
    text-sm font-medium 
    text-indigo-600 bg-indigo-50 
    hover:bg-indigo-100 hover:text-indigo-700 
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
    transition duration-150 ease-in-out
    disabled:opacity-50 disabled:cursor-not-allowed
    gap-1
  `;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Execute the passed-in onClick handler first
      event.stopPropagation();
      event.preventDefault();
      
    if (rest.onClick) {
      rest.onClick(event);
    }
    // Execute the custom onEdit handler
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <button
      type="button" // Use type="button" to prevent form submission if it's inside a form
      className={`${baseClasses} ${className}`}
      onClick={handleClick}
      {...rest} // Spread any other standard button props (e.g., disabled, title)
    >
      {/* Edit Icon (using a simple SVG) */}
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true" // Hide icon from screen readers if text is present
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
        />
      </svg>
      
      {/* Display Text or Children */}
      {children ? children : text}
    </button>
  );
};

export default EditButton;
