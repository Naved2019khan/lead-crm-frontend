"use client";
import Link from "next/link";
import EditButton from "../ui/EditButton";
import ToggleSwitch from "../ui/ToggleSwitch";

export const ProductDetailCard = ({ site, onEdit }) => {
  return (
    <Link href={`/dashboard/all-agency-sites/${site.siteId}`}
      key={site.siteId}
      className={`relative p-4 rounded-lg border text-left transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-gray-300/70 hover:-translate-y-0.5`}>
        
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {site.siteName} <span className="font-bold text-green-700"> ({site.siteId})</span>
          </h3>
          {site.siteDomain && (
            <p className="text-sm text-gray-500 mt-1">{site.siteDomain}</p>
          )}
          <div className="flex gap-2 mt-2">
            <ToggleSwitch initialState={site.siteStatus == "active"} />
            <EditButton onEdit={() => onEdit(site)} />
          </div>
        </div>
      </div>
      </Link>
  );
};
