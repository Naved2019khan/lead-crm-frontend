import React from 'react';
import { Modal } from '../ui/Modal';

// Define the structure of the props
interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  // Optional button text (defaults to 'Close' or 'Continue')
  actionButtonText?: string; 
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  onClose,
  title = 'Success!',
  message,
  actionButtonText = 'Continue',
}) => {
  if (!isOpen) {
    return null;
  }

  // NOTE: This assumes 'Modal' is a component you have defined elsewhere that handles 
  // background overlay, closing on escape/click outside, and rendering the children.
  // Replace '<Modal>' with your actual Modal component usage.
  return (
    <Modal isOpen={isOpen} onClose={onClose}> 
      <div className="w-full min-w-md mx-auto mt-12 sm:mt-24 px-4 sm:px-6 lg:px-8 py-8 sm p-6 bg-white shadow-2xl rounded-xl border border-gray-100 transform transition-all">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className={`p-2 rounded-full ${title == "Error" ? "bg-red-600" : "bg-green-100"}`}>
            <svg 
              className={`w-8 h-8 text-green-600`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title and Message */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 mb-6">
            {message}
          </p>
        </div>

        {/* Interactive Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm 
                       text-sm font-medium text-white bg-indigo-600 
                       hover:bg-indigo-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            {actionButtonText}
          </button>
        </div>
        
      </div>
    </Modal>
  );
};

export default ThankYouModal;