"use client";
import React, { useState, useEffect, useCallback } from 'react';
// --- Placeholder/Assumed Imports and Data ---
// NOTE: You will need to ensure this data and component are available.
const currency = [
  { currency: 'USD', currencyName: 'US Dollar', countryCode: 'US' },
  { currency: 'EUR', currencyName: 'Euro', countryCode: 'EU' },
  { currency: 'GBP', currencyName: 'British Pound', countryCode: 'GB' },
];

const FlagIcon = ({ code, style }) => (
  <span className="text-xl" style={style}>
    {/* Placeholder for a real flag library */}
    {code}
  </span>
);

const PLATFORM = [
  { keyword: 'SP', country: 'Spanish' },
  { keyword: 'C', country: 'English' },
  { keyword: 'IT', country: 'Italian' },
  { keyword: 'DE', country: 'Germany' },
  { keyword: 'PT', country: 'Portuguese' },
  { keyword: 'FR', country: 'French' },
];

// Initial state structure matching the form fields
const initialFormData = {
  status: '',
  platform: '',
  passengers: [
    { firstName: '', lastName: '', dob: '', gender: '' }
  ],
  email: '',
  gdsRefNo: '',
  ticketNumber: '',
  currency: '',
  totalPrice: '',
  netCost: '',
  mco: '0.00',
};
// -----------------------------------


const StepOne = ({ formType = "add" }) => {
  const [formData, setFormData] = useState(initialFormData);

  // --- Utility Functions for State Management ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const newPassengers = formData.passengers.map((passenger, i) => {
      if (i === index) {
        return { ...passenger, [name]: value };
      }
      return passenger;
    });
    setFormData(prev => ({ ...prev, passengers: newPassengers }));
  };

  const addPassenger = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      passengers: [...prev.passengers, { firstName: '', lastName: '', dob: '', gender: '' }],
    }));
  }, []);

  const removePassenger = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      passengers: prev.passengers.filter((_, i) => i !== index),
    }));
  }, []);

  // --- MCO Calculation Effect ---
  useEffect(() => {
    const totalPrice = Number(formData.totalPrice || 0);
    const netCost = Number(formData.netCost || 0);
    const mcoValue = (totalPrice - netCost).toFixed(2);

    // Only update if the MCO value has actually changed
    if (formData.mco !== mcoValue) {
      setFormData(prev => ({ ...prev, mco: mcoValue }));
    }
  }, [formData.totalPrice, formData.netCost, formData.mco]);

  // --- Simple Form Field Component (Tailwind Styled) ---
  const InputField = ({ name, label, type = "text", disabled = false, onChange, value, min, max }) => (
    <div className="flex-1 min-w-0">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        min={min}
        max={max}
        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
      />
    </div>
  );

  const SelectField = ({ name, label, onChange, value, children }) => (
    <div className="flex-1 min-w-0">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {children}
      </select>
    </div>
  );
  // -----------------------------------

  // Function to prevent the form from submitting (Optional, but good practice)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add your actual form submission logic here
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6 bg-white shadow-lg rounded-lg">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status Field */}
        <SelectField name="status" label="Status" value={formData.status} onChange={handleInputChange}>
          <option value="">-----Select Status-----</option>
          <option value="NEWBOOKING">New Booking</option>
          <option value="CHANGEBOOKING">Change Booking</option>
          <option value="CANCELLATION">Cancellation</option>
          <option value="PETADD">Pet Add</option>
          <option value="SEATUPGRADE">Seat Upgrade</option>
          <option value="OTHERS">Others</option>
        </SelectField>

        {/* Platform Field (Conditional) */}
        {formType === 'add' && (
          <SelectField label="platform" name="platform" value={formData.platform} onChange={handleInputChange}>
            <option value="">-----Select Platform-----</option>
            {PLATFORM.map(({ keyword, country }) => (
              <option value={keyword} key={country}>
                {country}
              </option>
            ))}
          </SelectField>
        )}
      </div>
      
      <hr className="my-6" />

      {/* Passengers Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Passengers</h3>
        
        <div className="space-y-4">
          {formData.passengers.map((passenger, index) => (
            <div 
              key={index} // Using index is okay when keys don't rely on array position (no sorting/filtering)
              className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 items-end"
            >
              <InputField
                name="firstName"
                label="First Name"
                value={passenger.firstName}
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <InputField
                name="lastName"
                label="Last Name"
                value={passenger.lastName}
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <InputField
                name="dob"
                label="Pax DOB"
                type="date"
                value={passenger.dob}
                onChange={(e) => handlePassengerChange(index, e)}
                max={new Date().toISOString().split("T")[0]} // disableFuture equivalent
              />
              <SelectField
                name="gender"
                label="Gender"
                value={passenger.gender}
                onChange={(e) => handlePassengerChange(index, e)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </SelectField>
              
              {formData.passengers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePassenger(index)}
                  className="w-full md:w-auto px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out h-[42px]"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          onClick={addPassenger}
        >
          + Add more Pax
        </button>
      </section>

      <hr className="my-6" />

      {/* Other Details */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Other Details</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <InputField name="email" label="Email" value={formData.email} onChange={handleInputChange} />
          <InputField name="gdsRefNo" label="GDS Ref. No" value={formData.gdsRefNo} onChange={handleInputChange} />
          <InputField name="ticketNumber" label="Ticket Number" value={formData.ticketNumber} onChange={handleInputChange} />
          
          <SelectField
            name="currency"
            label="Currency"
            value={formData.currency}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {currency.map((item) => (
              <option key={item.currency} value={item.currency} className="flex items-center">
                {`${item.currency} - ${item.currencyName}`}
              </option>
            ))}
          </SelectField>
        </div>
      </section>
      
      <hr className="my-6" />

      {/* Price Details */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Price Details</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <InputField name="totalPrice" label="Total Price" value={formData.totalPrice} onChange={handleInputChange} type="number" />
          <InputField name="netCost" label="Net Cost" value={formData.netCost} onChange={handleInputChange} type="number" />
          <InputField name="mco" label="MCO" value={formData.mco} disabled />
        </div>
      </section>

      {/* Optional: Add a Submit Button */}
      {/* <div className="mt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-md shadow-lg hover:bg-green-700 transition duration-150"
        >
          Submit Form
        </button>
      </div> */}
    </form>
  );
};

export default StepOne;