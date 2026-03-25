"use client";

import React, { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  MoreVertical, 
  Search,
  Filter,
  CheckCircle2,
  Clock
} from "lucide-react";

const EcomUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    { 
      id: "CUS-101", 
      name: "Sarah Jenkins", 
      email: "sarah.j@example.com", 
      location: "New York, USA", 
      orders: 12, 
      spend: "$2,450.00", 
      status: "Active",
      joined: "Jan 12, 2024"
    },
    { 
      id: "CUS-102", 
      name: "Michael Chen", 
      email: "m.chen@example.com", 
      location: "London, UK", 
      orders: 5, 
      spend: "$890.50", 
      status: "Active",
      joined: "Feb 05, 2024"
    },
    { 
      id: "CUS-103", 
      name: "Emma Wilson", 
      email: "emma.w@example.com", 
      location: "Berlin, DE", 
      orders: 28, 
      spend: "$5,120.00", 
      status: "Inactive",
      joined: "Dec 20, 2023"
    },
    { 
      id: "CUS-104", 
      name: "David Miller", 
      email: "david@miller.net", 
      location: "Sydney, AU", 
      orders: 3, 
      spend: "$120.00", 
      status: "Active",
      joined: "Mar 15, 2024"
    },
    { 
      id: "CUS-105", 
      name: "Lisa Thompson", 
      email: "lisa.t@example.com", 
      location: "Toronto, CA", 
      orders: 1, 
      spend: "$45.00", 
      status: "Pending",
      joined: "Mar 24, 2024"
    },
  ];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-600" />
            E-commerce Customers
          </h1>
          <p className="text-gray-500 font-medium mt-1 ml-11">Manage and view your store's customer base</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
          <UserPlus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Customers</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-gray-900">1,284</h3>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">+12% this month</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Active Now</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-gray-900">42</h3>
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-indigo-50" />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Avg. Lifetime Value</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-gray-900">$342.50</h3>
            <span className="text-indigo-500 text-xs font-bold underline cursor-pointer">View Report</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
               <Filter className="w-3.5 h-3.5" />
               Segment
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
               Export CSV
             </button>
          </div>
        </div>

        <div className="p-2 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Orders</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Total Spend</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.map((customer, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 leading-none mb-1">{customer.name}</p>
                        <p className="text-xs font-medium text-gray-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-300" />
                      {customer.location}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-lg text-xs font-black text-gray-700">
                      <ShoppingBag className="w-3 h-3" />
                      {customer.orders}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-gray-900">{customer.spend}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      customer.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                      customer.status === 'Inactive' ? 'bg-gray-100 text-gray-500' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-gray-300 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Users className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-bold">No customers found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcomUsersPage;
