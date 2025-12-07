
"use client";
import { Button } from '@/components/button/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { InputField } from '@/components/ui/InputField';
import RadioGroup from '@/components/ui/RadioGroup';
import { handleNext } from '@/redux/slice/stepper-slice';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface CabinOption {
  value: number;
  label: string;
}

const OPTIONS: CabinOption[] = [
  { value: 0, label: 'Economy' },
  { value: 1, label: 'Premium Economy' },
  { value: 2, label: 'Business' },
  { value: 3, label: 'First Class' },
];

interface FlightDetails {
  // Departure Flight
  tripType: string;
  from: string;
  to: string;
  airline: string;
  depDate: string;
  cabinClass: number | '';
  airlineNo: string;
  // Return Flight (Nested structure simplified for flat state access)
  returnFrom: string;
  returnTo: string;
  returnAirline: string;
  returnDepDate: string;
  returnCabinClass: number | '';
  returnAirlineNo: string;
}

const initialFormData: FlightDetails = {
  tripType: '1', // Default to OneWay
  from: '',
  to: '',
  airline: '',
  depDate: '',
  cabinClass: '',
  airlineNo: '',
  returnFrom: '',
  returnTo: '',
  returnAirline: '',
  returnDepDate: '',
  returnCabinClass: '',
  returnAirlineNo: '',
};

// -----------------------------------

const StepTwo: React.FC = () => {
  const [formData, setFormData] = useState<FlightDetails>(initialFormData);
  const { tripType } = formData;
  const showReturnFlight = tripType === '2';
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(handleNext())
    console.log('Form Data:', formData);

    // Add your actual form submission logic here
  };



  /**
   * Universal change handler for all simple fields.
   * Note: This assumes a flat state structure where 'stepTwo.field' becomes 'field' in the state.
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Standardizing the input name for a flat state structure
    // e.g., 'stepTwo.from' becomes 'from', 'stepTwo.arrivalflights.0.returnFrom' becomes 'returnFrom'
    let stateName = name.split('.').pop() as keyof FlightDetails;

    // Handle cabinClass name mapping for return flight
    if (stateName === 'cabinClass' && name.includes('arrivalflights')) {
      stateName = 'returnCabinClass';
    }

    setFormData(prev => ({
      ...prev,
      [stateName]: value,
    }));
  }, []);



  return (
    <form className="space-y-6 p-4 bg-gray-100 "
      onSubmit={handleSubmit}
    >
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Flight Details</h3>

        {/* Trip Type Radio Group */}
        <RadioGroup
          name="stepTwo.tripType" // Use full path for consistency if passing to parent form
          options={[
            { value: '1', label: 'OneWay' },
            { value: '2', label: 'RoundTrip' },
          ]}
          label="Trip Type"
          onChange={handleInputChange}
          selectedValue={formData.tripType}
        />

        {/* Departure Flight Details */}
        <div className="flex flex-col md:flex-row gap-4 p-2 border border-gray-100 rounded-md">
          <InputField className='bg-white' required label="From" name="stepTwo.from" value={formData.from} onChange={handleInputChange} />
          <InputField className='bg-white' required label="To" name="stepTwo.to" value={formData.to} onChange={handleInputChange} />
          <InputField className='bg-white' required label="Airline" name="stepTwo.airline" value={formData.airline} onChange={handleInputChange} />
          <InputField className='bg-white' required name={`stepTwo.depDate`} label="Departure Date" type="date" value={formData.depDate} onChange={handleInputChange}
          />
          <div>
            <Dropdown options={OPTIONS} label="Cabin Class" name="stepTwo.cabinClass" value={formData.cabinClass}
              onChange={(val) => handleInputChange({ target: { name: 'stepTwo.cabinClass', value: val } })} />
          </div>
          <InputField className='bg-white' label="Airline No" name="stepTwo.airlineNo" value={formData.airlineNo} onChange={handleInputChange} />
        </div>
      </section>

      {/* Conditional Return Flight Section */}
      {showReturnFlight && (
        <section className="space-y-4  pt-4 mt-6">
          <h4 className="text-lg font-semibold text-gray-700">Return Flight</h4>

          <div className="flex flex-col md:flex-row gap-4 p-2 border border-gray-100 rounded-md bg-gray-50">
            {/* Note: Names map to the flat state structure: returnFrom, returnTo, etc. */}
            <InputField className='bg-white' required label="From" name="stepTwo.arrivalflights.0.returnFrom" value={formData.returnFrom} onChange={handleInputChange} />
            <InputField className='bg-white' required label="To" name="stepTwo.arrivalflights.0.returnTo" value={formData.returnTo} onChange={handleInputChange} />
            <InputField className='bg-white' required label="Airline" name="stepTwo.arrivalflights.0.returnAirline" value={formData.returnAirline} onChange={handleInputChange} />

            <InputField className='bg-white'
              name="stepTwo.arrivalflights.0.returnDepDate"
              label="Return Date"
              type="date"
              required
              value={formData.returnDepDate}
              onChange={handleInputChange}
            />
            <div>

              <Dropdown options={OPTIONS} label="Cabin Class" name="stepTwo.arrivalflights.0.cabinClass" value={formData.returnCabinClass} onChange={(val) => handleInputChange({ target: { name: 'stepTwo.arrivalflights.0.cabinClass', value: val } })} />
            </div>


            <InputField className='bg-white' label="Airline No" name="stepTwo.arrivalflights.0.returnAirlineNo" value={formData.returnAirlineNo} onChange={handleInputChange} />
          </div>
        </section>
      )}

      {/* Optional: Display current state for debugging */}
      {/* <pre className="text-xs bg-gray-100 p-3 mt-4 rounded">
        {JSON.stringify(formData, null, 2)}
      </pre> */}

      <Button className='w-full mt-auto' variant="primary" type="submit">Procced to Payment</Button>

    </form>
  );
};

export default StepTwo;