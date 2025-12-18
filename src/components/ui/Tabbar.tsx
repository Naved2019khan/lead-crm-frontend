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
     
      {/* Tab Bar */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1.5">
          <div className="flex gap-1">
            {TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg flex-1 justify-center
                    ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }
                  `}
                >
                  <span className="transition-all duration-200">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {componentList[activeTab]}
      </div>
    </div>
  );
}
