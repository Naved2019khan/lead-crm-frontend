   export const paxGroupValidatior = (formData) => {
    const newErrors = {};
    formData.passengers.forEach((pax, idx) => {
      ["firstName", "lastName", "dob","gender"].forEach((field) => {
        const error = validateField(field, pax[field]);
        if (error) newErrors[`passenger-${idx}-${field}`] = error;
      });
    });
    ["email", "totalPrice", "netCost","status","platform"].forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const validateField = (name, value) => {
    switch (name) {
      case "gender":
        return !value ? "Gender is required" : "";
      case "email":
        return !value ? "email required" : 
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format"
          : "";
      case "status":
        return !value ? "status required" : ""
      case "platform":
        return !value ? "platform required" : ""
      case "totalPrice":
        return !value ||  value < 0 ? "Must be a valid positive number" : "";
      case "netCost":
        return !value || (isNaN(value) || parseFloat(value) < 0)
          ? "Must be a valid positive number"
          : "";
      case "firstName":
        return !value.trim() ? "This field is required" : "";
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