"use client";

import React, { useState, useEffect } from "react";
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
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Loader2
} from "lucide-react";
import { ecomUserApi, EcomUser, UserActivity } from "@/services/api/ecom-user-api";
import { toast } from "sonner";

const EcomUsersPage = () => {
  const [activeTab, setActiveTab] = useState<'directory' | 'register' | 'tracking'>('directory');
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<EcomUser[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Registration Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    status: "Active" as const
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, activitiesData] = await Promise.all([
        ecomUserApi.getUsers(),
        ecomUserApi.getActivities()
      ]);
      setCustomers(usersData);
      setActivities(activitiesData);
    } catch (error) {
      toast.error("Failed to fetch customer data");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await ecomUserApi.createUser(formData);
      toast.success("Customer registered successfully!");
      setFormData({ name: "", email: "", location: "", status: "Active" });
      await fetchData(); // Refresh directory
      setActiveTab('directory');
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDirectory = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-bold text-gray-500">Loading directory...</p>
          </div>
        ) : (
          <>
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
                  <tr key={customer.id} className="hover:bg-gray-50/30 transition-all group">
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
          </>
        )}
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="p-8 max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Register New Customer</h2>
        <p className="text-gray-500 font-medium">Create a new e-commerce profile manually</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. John Doe"
              className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com"
              className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
          <input 
            type="text" 
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="e.g. New York, USA"
            className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Initialize Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );

  const renderTracking = () => (
    <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <Zap className="w-6 h-6 text-amber-500" />
            Live Activity Feed
          </h2>
          <p className="text-gray-500 font-medium">Real-time customer interactions and events</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-wider animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
          Live
        </div>
      </div>

      <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
        {activities.map((activity) => (
          <div key={activity.id} className="relative pl-12 group">
            <div className={`absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border border-white z-10 transition-transform group-hover:scale-110 ${
              activity.type === 'signup' ? 'bg-emerald-50 text-emerald-600' :
              activity.type === 'order' ? 'bg-indigo-50 text-indigo-600' :
              activity.type === 'update' ? 'bg-blue-50 text-blue-600' :
              'bg-gray-50 text-gray-600'
            }`}>
              {activity.type === 'signup' && <UserPlus className="w-5 h-5" />}
              {activity.type === 'order' && <ShoppingBag className="w-5 h-5" />}
              {activity.type === 'update' && <ShieldCheck className="w-5 h-5" />}
              {activity.type === 'view' && <Clock className="w-5 h-5" />}
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group-hover:border-indigo-100 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-gray-900">{activity.userName}</span>
                <span className="text-[10px] font-bold text-gray-400">{activity.time}</span>
              </div>
              <p className="text-sm font-medium text-gray-500">{activity.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-600" />
            Customer Intelligence
          </h1>
          <p className="text-gray-500 font-medium mt-1 ml-11">Advanced management and behavioral tracking</p>
        </div>
        <div className="flex bg-gray-100/50 p-1.5 rounded-2xl gap-1">
          <button 
            onClick={() => setActiveTab('directory')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'directory' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Directory
          </button>
          <button 
            onClick={() => setActiveTab('register')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Register
          </button>
          <button 
            onClick={() => setActiveTab('tracking')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tracking' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Live Feed
          </button>
        </div>
      </div>

      {/* Stats Cards (Pinned at top) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Database</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-gray-900">{customers.length}</h3>
            <span className="text-emerald-500 text-[10px] font-black bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Active Sessions</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-gray-900">14</h3>
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-indigo-100 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">New Registrations</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-gray-900">4</h3>
            <span className="text-indigo-500 text-[10px] font-black bg-indigo-50 px-2 py-1 rounded-lg">Today</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Platform LTV</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-gray-900">$3.2k</h3>
            <span className="text-gray-400 text-[10px] font-bold underline cursor-pointer">Stats</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-50/20 overflow-hidden min-h-[600px]">
        {activeTab === 'directory' && renderDirectory()}
        {activeTab === 'register' && renderRegister()}
        {activeTab === 'tracking' && renderTracking()}
      </div>
    </div>
  );
};

export default EcomUsersPage;
