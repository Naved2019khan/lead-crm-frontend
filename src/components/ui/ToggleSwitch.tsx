import React, { useState } from 'react';

// Define the props interface for type safety
interface ToggleSwitchProps {
  initialState?: boolean;
  onToggle?: (newState: boolean) => void;
  label?: string; // Optional label for accessibility/description
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  initialState = false,
  onToggle,
  label,
}) => {
  const [isOn, setIsOn] = useState(initialState);

  // Function to handle the toggle click
  const handleToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newState = !isOn;
    setIsOn(newState);
    // Call the optional callback function
    if (onToggle) {
      onToggle(newState);
    }
  };

  // Tailwind classes for the track (the background)
  const trackClasses = `
    w-12 h-6 flex items-center rounded-full p-1 cursor-pointer 
    transition-colors duration-300 ease-in-out
    ${isOn ? 'bg-indigo-600' : 'bg-gray-300'}
  `;

  // Tailwind classes for the thumb (the moving circle)
  const thumbClasses = `
    w-4 h-4 bg-white rounded-full shadow-md 
    transform transition-transform duration-300 ease-in-out
    ${isOn ? 'translate-x-6' : 'translate-x-0'}
  `;

  return (
    <div className="flex items-center space-x-2">
      {/* Optional Label */}
      {label && <span className="text-gray-700 select-none">{label}</span>}
      
      {/* The Toggle Button */}
      <div
        className={trackClasses}
        onClick={handleToggle}
        role="switch" // ARIA role for accessibility
        aria-checked={isOn}
        tabIndex={0} // Make it focusable
        onKeyDown={(e) => {
          // Allow toggling with the Enter or Space key
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent default scroll/action
            handleToggle();
          }
        }}
      >
        <div className={thumbClasses} />
      </div>
    </div>
  );
};

export default ToggleSwitch;
