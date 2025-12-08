import { AlertMessage } from "@/components/ui/AlertMessage";
import { Dropdown } from "@/components/ui/Dropdown";
import { InputField } from "@/components/ui/InputField";
import { User , Calendar, X, XCircle } from "lucide-react";

export const PassengerCard = ({ passenger, index, onRemove, onPassengerChange, errors }) => {
  const paxErrors = {
    firstName: errors?.[`passenger-${index}-firstName`] || "",
    lastName: errors?.[`passenger-${index}-lastName`] || "",
    dob: errors?.[`passenger-${index}-dob`] || "",
    gender: errors?.[`passenger-${index}-gender`] || "",
  };

  const handleInputChange = (e) => {
    onPassengerChange(index, e);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 p-4 rounded-lg border border-[#edf2f7]">
      <InputField
        className="bg-white"
        name="firstName"
        label="First Name"
        icon={User}
        value={passenger.firstName}
        onChange={handleInputChange}
        error={paxErrors?.firstName}
      />
      <InputField
        className="bg-white"
        name="lastName"
        label="Last Name"
        icon={User}
        value={passenger.lastName}
        onChange={handleInputChange}
        error={paxErrors?.lastName}
      />
      <InputField
        className="bg-white"
        name="dob"
        label="Date of Birth"
        icon={Calendar}
        type="date"
        value={passenger.dob}
        onChange={handleInputChange}
        max={new Date().toISOString().split("T")[0]}
        error={paxErrors?.dob}
      />
      <div>
        <div className="relative">
        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
          Gender
        </label>
        <Dropdown
          options={GENDER_OPTIONS}
          name="gender"
          value={passenger.gender}
          onChange={(value) => onPassengerChange(index, {target : { name: "gender", value }})}
          className="text-sm"
        />
        <AlertMessage className="text-xs" variant="error">{paxErrors?.gender}</AlertMessage>
        </div>
        
      </div>
      {index > 0 && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="mt-2 bg-red-600  border w-fit items-center justify-center flex gap-1 text-sm text-white  rounded-lg p-1  font-medium"
          >
            <span><XCircle className="w-4 h-4" /></span>
            Remove Pax {index + 1}
          </button>
        )}
    </div>
  );
};

const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];