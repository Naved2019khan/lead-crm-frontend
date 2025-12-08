"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Mail,
  Hash,
  DollarSign,
  Calendar,
  Plane,
  Globe,
  Users,
  Tag,
} from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { AlertMessage } from "@/components/ui/AlertMessage";

// --- Constants ---
const currency = [
  { currency: "USD", currencyName: "US Dollar", flag: "🇺🇸" },
  { currency: "EUR", currencyName: "Euro", flag: "🇪🇺" },
  { currency: "GBP", currencyName: "British Pound", flag: "🇬🇧" },
];

const PLATFORM = [
  { value: "SP", label: "Spanish" },
  { value: "C", label: "English" },
  { value: "IT", label: "Italian" },
  { value: "DE", label: "German" },
  { value: "PT", label: "Portuguese" },
  { value: "FR", label: "French" },
];

const GENDER_OPTIONS = [
  { value: "", label: "— Select —" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const REQUEST_TYPE = [
  { value: "", label: "— Select Type —" },
  { value: "NEWBOOKING", label: "New Booking" },
  { value: "CHANGEBOOKING", label: "Change Booking" },
  { value: "CANCELLATION", label: "Cancellation" },
  { value: "PETADD", label: "Add Pet" },
  { value: "SEATUPGRADE", label: "Seat Upgrade" },
  { value: "OTHERS", label: "Other Request" },
];

const initialFormData = {
  status: "",
  platform: "",
  passengers: [{ firstName: "", lastName: "", dob: "", gender: "" }],
  email: "",
  gdsRefNo: "",
  ticketNumber: "",
  currency: "",
  totalPrice: "",
  netCost: "",
  mco: "0.00",
};

// --- InputField Component (Reusable) ---
const InputField = ({ name, label, icon: Icon, type = "text", value, onChange, error, ...props }) => (
  <div className="flex-1 min-w-0 relative">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
      {Icon && <Icon className="w-4 h-4 text-blue-600" />}
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 ${
        error
          ? "border-red-400 focus:ring-red-200"
          : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
      } transition`}
      {...props}
    />
    <AlertMessage>
    {error}
    </AlertMessage>
    {/* {error && <p className="mt-1 text-sm text-red-600">{error}</p>} */}
  </div>
);

// --- PassengerCard: Moved OUTSIDE to prevent re-creation on every render ---
const PassengerCard = ({ passenger, index, onRemove, onPassengerChange, errors, onGenderChange }) => {
  const paxErrors = {
    firstName: errors[`passenger-${index}-firstName`],
    lastName: errors[`passenger-${index}-lastName`],
    dob: errors[`passenger-${index}-dob`],
  };

  const handleInputChange = (e) => {
    onPassengerChange(index, e);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-blue-50/30 rounded-xl border border-blue-100 items-end">
  <div className="flex-1 min-w-0 flex flex-col">

      <InputField
        name="firstName"
        label="First Name"
        icon={User}
        value={passenger.firstName}
        onChange={handleInputChange}
        error={paxErrors.firstName}
        />
        </div>
  <div className="flex-1 min-w-0 flex flex-col">
      <InputField
        name="lastName"
        label="Last Name"
        icon={User}
        value={passenger.lastName}
        onChange={handleInputChange}
        error={paxErrors.lastName}
      />
           </div>
             <div className="flex-1 min-w-0 flex flex-col">
      <InputField
        name="dob"
        label="Date of Birth"
        icon={Calendar}
        type="date"
        value={passenger.dob}
        onChange={handleInputChange}
        max={new Date().toISOString().split("T")[0]}
        error={paxErrors.dob}
      />
           </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <Dropdown
          options={GENDER_OPTIONS}
          name="gender"
          label="Gender"
          value={passenger.gender}
          onChange={(value) => onGenderChange(index, value)}
        />
      </div>
      {index > 0 && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="mt-6 md:mt-0 w-full md:w-auto px-4 py-2.5 bg-red-500/10 text-red-600 font-medium rounded-lg border border-red-300 hover:bg-red-500/20 transition"
        >
          Remove
        </button>
      )}
    </div>
  );
};

const StepOne = ({ formType = "add" }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // --- Validation ---
  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email format"
          : "";
      case "totalPrice":
        return value && (isNaN(value) || parseFloat(value) < 0)
          ? "Must be a valid positive number"
          : "";
      case "netCost":
        return value && (isNaN(value) || parseFloat(value) < 0)
          ? "Must be a valid positive number"
          : "";
      case "firstName":
      case "lastName":
        return !value.trim() ? "This field is required" : "";
      case "dob":
        if (!value) return "Date of birth is required";
        const today = new Date();
        const dob = new Date(value);
        return dob > today ? "Date cannot be in the future" : "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    formData.passengers.forEach((pax, idx) => {
      ["firstName", "lastName", "dob"].forEach((field) => {
        const error = validateField(field, pax[field]);
        if (error) newErrors[`passenger-${idx}-${field}`] = error;
      });
    });
    ["email", "totalPrice", "netCost"].forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newPassengers = [...prev.passengers];
      newPassengers[index] = { ...newPassengers[index], [name]: value };
      return { ...prev, passengers: newPassengers };
    });
    const key = `passenger-${index}-${name}`;
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleGenderChange = (index, value) => {
    setFormData((prev) => {
      const newPassengers = [...prev.passengers];
      newPassengers[index] = { ...newPassengers[index], gender: value };
      return { ...prev, passengers: newPassengers };
    });
    const key = `passenger-${index}-gender`;
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const addPassenger = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      passengers: [...prev.passengers, { firstName: "", lastName: "", dob: "", gender: "" }],
    }));
  }, []);

  const removePassenger = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      passengers: prev.passengers.filter((_, i) => i !== index),
    }));
    setErrors((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`passenger-${index}-`)) delete updated[key];
      });
      return updated;
    });
  }, []);

  // --- Auto-calculate MCO ---
  useEffect(() => {
    const totalPrice = parseFloat(formData.totalPrice) || 0;
    const netCost = parseFloat(formData.netCost) || 0;
    const mco = Math.max(0, totalPrice - netCost).toFixed(2);
    if (formData.mco !== mco) {
      setFormData((prev) => ({ ...prev, mco }));
    }
  }, [formData.totalPrice, formData.netCost]);

  // --- Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("✅ Valid Form Data:", formData);
    } else {
      console.log("❌ Validation failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-5 md:p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white mb-4">
          <Plane className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">New Booking Request</h2>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details below to create a new travel reservation
        </p>
      </div>

      {/* Status & Platform */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Dropdown
          name="status"
          options={REQUEST_TYPE}
          label="Request Type"
          icon={Tag}
          value={formData.status}
          onChange={(value) =>
            handleInputChange({ target: { name: "status", value } })
          }
        />
        {formType === "add" && (
          <Dropdown
            options={PLATFORM}
            name="platform"
            label="Platform Language"
            icon={Globe}
            value={formData.platform}
            onChange={(value) =>
              handleInputChange({ target: { name: "platform", value } })
            }
          />
        )}
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Passengers */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Passenger Details
          </h3>
          <button
            type="button"
            onClick={addPassenger}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
          >
            + Add Passenger
          </button>
        </div>
        <div className="space-y-5">
          {formData.passengers.map((passenger, index) => (
            <PassengerCard
              key={index}
              index={index}
              passenger={passenger}
              onRemove={removePassenger}
              onPassengerChange={handlePassengerChange}
              onGenderChange={handleGenderChange}
              errors={errors}
            />
          ))}
        </div>
      </section>

      <hr className="border-gray-200 my-6" />

      {/* Booking Info */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-blue-600" />
          Booking Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <InputField
            name="email"
            label="Contact Email"
            icon={Mail}
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <InputField
            name="gdsRefNo"
            label="GDS Ref No"
            icon={Hash}
            value={formData.gdsRefNo}
            onChange={handleInputChange}
          />
          <InputField
            name="ticketNumber"
            label="Ticket Number"
            icon={Hash}
            value={formData.ticketNumber}
            onChange={handleInputChange}
          />
        </div>
      </section>

      <hr className="border-gray-200 my-6" />

      {/* Pricing */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-600" />
          Pricing Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputField
            name="totalPrice"
            label="Total Price"
            icon={DollarSign}
            type="number"
            min="0"
            step="0.01"
            value={formData.totalPrice}
            onChange={handleInputChange}
            error={errors.totalPrice}
          />
          <InputField
            name="netCost"
            label="Net Cost"
            icon={DollarSign}
            type="number"
            min="0"
            step="0.01"
            value={formData.netCost}
            onChange={handleInputChange}
            error={errors.netCost}
          />
          <InputField
            name="mco"
            label="MCO (Markup)"
            icon={DollarSign}
            value={formData.mco}
            disabled
            className="bg-blue-50"
          />
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Booking Request
        </button>
      </div>
    </form>
  );
};

export default StepOne;