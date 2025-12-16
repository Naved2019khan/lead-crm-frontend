"use client";
import { useState } from "react";


interface Tab {
  id: number;
  label: string;
  icon: JSX.Element;
}

// const TABS: Tab[] = [
//   { id: 1, label: "Infant", icon: <Baby className="h-5 w-5" /> },
//   { id: 2, label: "Toddler", icon: <Smile className="h-5 w-5" /> },
//   { id: 3, label: "Child", icon: <User className="h-5 w-5" /> },
//   { id: 4, label: "Teen", icon: <GraduationCap className="h-5 w-5" /> },
//   { id: 5, label: "Group", icon: <Users className="h-5 w-5" /> },
// ];


export default function Tabbar({componentList , TABS }) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Tabbar</h2>

      {/* Tab Bar */}
      <div className="flex gap-2 border-b border-gray-200 mb-6">
        {TABS.map((tab,idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all
                ${
                  isActive
                    ? "border-b-2 border-blue-600 text-blue-600"
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
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {componentList[activeTab]}
      </div>
    </div>
  );
}
