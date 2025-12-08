"use client"
import React, { useState, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';

export const Dropdown = ({ options,label, value, onChange, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {label && <label className="block text-xs mb-2 font-medium text-gray-700">{label}</label>}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-1.5 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white w-full mt-2 border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
               type='button'
                key={option.value}
                onClick={() => {
                  onChange(option.value,name);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
              >
                <span className={option.value === value ? "text-gray-600 font-medium" : "text-gray-700"}>
                  {option.label}
                </span>
                {option.value === value && (
                  <Check size={16} className="text-gray-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};