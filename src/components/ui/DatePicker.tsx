import { AlertMessage } from "./AlertMessage";
import { Calendar, Clock } from "lucide-react";

// --- Single DateTime Input (Alternative) ---
export const DateTimeInputField = ({ 
  name, 
  label, 
  icon: Icon = Calendar,
  value, 
  onChange, 
  error, 
  disabled,
  minDateTime,
  className = "" 
}) => (
  <div className="relative ">
    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-[#718096]" />}
      {label}
    </label>
    <input
      name={name}
      type="datetime-local"
      value={value}
      onChange={onChange}
      disabled={disabled}
      min={minDateTime}
      className={`w-full bg-white rounded-md border px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#a5b4fc] ${
        disabled
          ? "bg-[#f8fafc] cursor-not-allowed"
          : error
          ? "border-red-300"
          : "border-[#e2e8f0] focus:border-[#818cf8]"
      } ${className}`}
    />
    <AlertMessage>{error}</AlertMessage>
  </div>
);