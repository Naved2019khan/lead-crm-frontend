"use client"
import React, { useState } from 'react';
import {  Users } from 'lucide-react';
import { useSession } from 'next-auth/react';



const DashboardMain: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, John</h2>
            <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              { label: 'Total Users', value: '2,543', change: '+12.5%' },
              { label: 'Revenue', value: '$45,231', change: '+8.2%' },
              { label: 'Active Projects', value: '12', change: '+3' },
              { label: 'Completion Rate', value: '94.1%', change: '+2.4%' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-2">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">New user registration</p>
                    <p className="text-sm text-gray-500 mt-1">User joined the platform</p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">2h ago</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      {/* Mobile Sidebar Overlay */}
      {/* {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )} */}
    </>
  );
};

export default DashboardMain;