"use client"
import { useState } from 'react';

export default function BookingTableToolbar() {
  const [openCollapse, setOpenCollapse] = useState(false);

  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" className="w-48 px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" className="w-48 px-3 py-2 border rounded-md" />
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
        <input
          type="text"
          maxLength={10}
          placeholder="Search booking id..."
          className="w-56 px-3 py-2 border rounded-md"
        />
        </div>

<div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
        <input
          type="text"
          maxLength={15}
          placeholder="PNR"
          className="w-56 px-3 py-2 border rounded-md"
        />
        </div>

    <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
        <select className="w-48 px-3 py-2 border rounded-md">
          <option value="All">All</option>
          <option value="CANCEL">CANCEL</option>
          <option value="CONFIRM">CONFIRM</option>
        </select>
        </div>

        <div className="flex gap-2 self-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Apply</button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Reset</button>
          <button
            className="bg-gray-100 px-2 py-2 rounded-md border"
            onClick={() => setOpenCollapse(!openCollapse)}
          >
            {openCollapse ? '▲' : '▼'}
          </button>
          <button className="bg-green-100 text-green-800 px-2 py-2 rounded-md border">
            Export CSV
          </button>
        </div>
      </div>

      {openCollapse && (
        <div className="flex flex-wrap gap-4 items-center border-t pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
            <select className="w-48 px-3 py-2 border rounded-md">
              <option value={0}>All</option>
              <option value={1}>Oneway</option>
              <option value={2}>Round Trip</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
            <select className="w-48 px-3 py-2 border rounded-md">
              <option value="">Select Agent</option>
              <option value="agent1">Agent 1</option>
              <option value="agent2">Agent 2</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
