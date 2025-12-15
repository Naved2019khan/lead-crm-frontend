import { Dropdown } from '@/components/ui/Dropdown';
import { InputField } from '@/components/ui/InputField';
import { createBooking } from '@/services/api/booking-api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

// Optional: Replace this with your actual countries import later
const countries = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'AU', label: 'Australia' },
  // Add more as needed
];

type FormData = {
  address: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  billingPhone: string;
};

const StepThree = () => {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
    billingPhone: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const prevFormData = useSelector((state) => state.stepperSlice.data);
  const router = useRouter();

  const validateStepThree = (data: FormData) => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!data.address.trim()) newErrors.address = "Address is required";
    if (!data.city.trim()) newErrors.city = "City is required";
    if (!data.country) newErrors.country = "Country is required";
    if (!data.state.trim()) newErrors.state = "State is required";
    if (!data.postalCode.trim()) {
      newErrors.postalCode = 'Postal/Zip code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(data.postalCode) ) {
      newErrors.postalCode = 'Invalid US ZIP code';
    }
    if (!data.billingPhone.trim()) {
      newErrors.billingPhone = "Billing phone is required";
    } else if (!/^\+?[\d\s\-()]+$/.test(data.billingPhone)) {
      newErrors.billingPhone = "Invalid phone number format";
    }

    return newErrors;
  };

  const handleChange = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStepThree(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('✅ Valid Form Data:', {...prevFormData  ,address : formData});
      const response = await createBooking({...prevFormData  ,address : formData});
      router.push('/dashboard');
      // Proceed to next step or submit
    } else {
      console.log("❌ Validation failed");
    }
  };

  return (
    <div className="max-w-xl  p-4 bg-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Billing Information
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Address & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address *
            </label>
            <InputField
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="123 Main St"
              error={errors?.address}
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City *
            </label>
            <InputField
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="New York"
              error={errors?.city}
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country *
          </label>
          <Dropdown
            id="country"
            name="country"
            options={countries}
            value={formData.country}
            onChange={(value)=>handleChange({target:{name:"country",value}})}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        {/* State, Postal Code, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State *
            </label>
            <InputField
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className="bg-white"
              placeholder="CA"
              error={errors?.state}
            />
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Postal/Zip Code *
            </label>
            <InputField
              id="postalCode"
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={handleChange}
              className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.postalCode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="90210"
              error={errors?.postalCode}
            />
          </div>

          <div>
            <label
              htmlFor="billingPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Billing Phone *
            </label>
            <InputField
              id="billingPhone"
              name="billingPhone"
              type="tel"
              value={formData.billingPhone}
              onChange={handleChange}
              className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.billingPhone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+1 (555) 123-4567"
              error={errors?.billingPhone}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            Complete
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
