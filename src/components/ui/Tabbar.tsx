"use client";
import { useState } from "react";


interface Tab {
  id: number;
  label: string;
  icon: JSX.Element;
}



export default function Tabbar({componentList , TABS }) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full  p-6">
      <h2 className="text-xl font-semibold mb-4">Flight Booking Details</h2>
      {/* Tab Bar */}
      <div className="flex justify-center gap-2 border-b border-gray-200 mb-6">
        {TABS.map((tab,idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all
                ${
                  isActive
                    ? "border-b-3 border-gray-600 text-gray-600"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
        {componentList[activeTab]}
    </div>
  );
}
