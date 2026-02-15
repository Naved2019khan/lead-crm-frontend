/**
 * A reusable, Tailwind-styled select field component.
 * @param {string} name - The HTML 'name' attribute for the select.
 * @param {string} label - The visible label for the select.
 * @param {function} onChange - The handler function for the select change event.
 * @param {string | number} value - The current value of the select.
 * @param {React.ReactNode} children - The <option> elements to display in the dropdown.
 */
const SelectField = ({ 
  name, 
  label, 
  onChange, 
  value, 
  children 
}) => {
  return (
    <div className="flex-1 min-w-0">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
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
};

export default SelectField;
