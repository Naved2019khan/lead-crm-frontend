// components/NewProductSite.tsx

import React from 'react';
import { SiteDetails, SiteStatus } from '@/types'; // Assuming types.ts is in the root or a 'src' folder

interface NewProductSiteProps {
  initialData?: SiteDetails;
  isEditing?: boolean;
  onSubmit: (data: SiteDetails) => void;
}

const defaultData: SiteDetails = {
  siteId: null,
  siteName: '',
  siteDomain: '',
  siteStatus: 'active',
};

/**
 * A Tailwind CSS-styled form component for managing Site Details.
 * @param initialData - The current site details to display/edit.
 * @param isEditing - If true, displays input fields; otherwise, displays read-only text.
 * @param onSubmit - Function to handle form submission.
 */
export const NewProductSite: React.FC<NewProductSiteProps> = ({
  initialData = defaultData,
  isEditing = false,
  onSubmit,
}) => {
  // Simple state for form data (can be replaced by a more robust state manager like useReducer or react-hook-form)
  const [formData, setFormData] = React.useState<SiteDetails>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number = value;

    // Handle number conversion for siteId
    // if (name === 'siteId' && type === 'number') {
    //   finalValue = parseInt(value, 10) || 0;
    // }

    setFormData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const siteId =  Number(formData.siteId);
    onSubmit({...formData,siteId },initialData.siteId);
  };

  const statusColor = formData.siteStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className="w-xl mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        {isEditing ? 'Edit Site Details' : 'Site Details'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* --- Site ID (Number, Required, Unique) --- */}
        <div>
          <label htmlFor="siteId" className="block text-sm font-medium text-gray-700">
            Site ID
          </label>
          {isEditing ? (
            <input
              type="number"
              id="siteId"
              name="siteId"
              required
              value={formData.siteId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              disabled={!isEditing} // Often ID is not editable
            />
          ) : (
            <p className="mt-1 text-lg font-mono text-gray-900 border-b border-dashed">
              {formData.siteId}
            </p>
          )}
        </div>

        {/* --- Site Name (String, Required) --- */}
        <div>
          <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
            Site Name
          </label>
          {isEditing ? (
            <input
              type="text"
              id="siteName"
              name="siteName"
              required
              value={formData.siteName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          ) : (
            <p className="mt-1 text-lg text-gray-900">
              {formData.siteName}
            </p>
          )}
        </div>

        {/* --- Site Domain (String, Required, Unique) --- */}
        <div>
          <label htmlFor="siteDomain" className="block text-sm font-medium text-gray-700">
            Site Domain
          </label>
          {isEditing ? (
            <input
              type="text"
              id="siteDomain"
              name="siteDomain"
              required
              value={formData.siteDomain}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          ) : (
            <p className="mt-1 text-lg text-blue-600 font-medium">
              {formData.siteDomain}
            </p>
          )}
        </div>

        {/* --- Site Status (String, Enum, Default: 'active') --- */}
        <div>
          <label htmlFor="siteStatus" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          {isEditing ? (
            <select
              id="siteStatus"
              name="siteStatus"
              required
              value={formData.siteStatus}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          ) : (
            <span
              className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium capitalize ${statusColor}`}
            >
              {formData.siteStatus}
            </span>
          )}
        </div>

        {/* --- Submission Button (Only visible in editing mode) --- */}
        {isEditing && (
          <div className="pt-4">
            <button
              type="submit"
              className="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};