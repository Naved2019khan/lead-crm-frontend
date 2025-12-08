import { AlertMessage } from "./AlertMessage";

// --- InputField Component (Paper-style) ---
export const InputField = ({ name, label, icon: Icon, type = "text", value, onChange, error, disabled, className = "", ...props }) => (
  <div className="relative flex-1 min-w-0">
    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-[#718096]" />}
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-md border px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#a5b4fc] ${
        disabled
          ? "bg-[#f8fafc] cursor-not-allowed"
          : error
          ? "border-red-300"
          : "border-[#e2e8f0] focus:border-[#818cf8]"
      } ${className}`}
      {...props}
    />
    <AlertMessage>
      {error}
    </AlertMessage>
    {/* {error && <p className="mt-1 text-xs text-red-500">{error}</p>} */}
  </div>
);