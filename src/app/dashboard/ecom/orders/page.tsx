"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Truck,
  X,
  MapPin,
  Phone,
  Mail as MailIcon,
  CreditCard,
  Package,
  Users
} from "lucide-react";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  items: number;
  total: string;
  status: "Completed" | "Pending" | "Cancelled" | "Delivered";
  date: string;
  shippingAddress: Address;
  billingAddress: Address;
}

const EcomOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: "#ORD-7421", 
      customer: "Sarah Jenkins", 
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      items: 3, 
      total: "$245.00", 
      status: "Completed", 
      date: "Mar 24, 2024",
      shippingAddress: {
        street: "123 Maple Ave",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "USA"
      },
      billingAddress: {
        street: "123 Maple Ave",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "USA"
      }
    },
    { 
      id: "#ORD-7422", 
      customer: "Michael Chen", 
      email: "m.chen@example.com",
      phone: "+44 20 7123 4567",
      items: 1, 
      total: "$89.99", 
      status: "Pending", 
      date: "Mar 25, 2024",
      shippingAddress: {
        street: "45 London Wall",
        city: "London",
        state: "Greater London",
        zip: "EC2M 5QD",
        country: "UK"
      },
      billingAddress: {
        street: "45 London Wall",
        city: "London",
        state: "Greater London",
        zip: "EC2M 5QD",
        country: "UK"
      }
    },
    { 
      id: "#ORD-7423", 
      customer: "Emma Wilson", 
      email: "emma.w@example.com",
      phone: "+49 30 12345678",
      items: 5, 
      total: "$512.50", 
      status: "Completed", 
      date: "Mar 23, 2024",
      shippingAddress: {
        street: "Friedrichstraße 100",
        city: "Berlin",
        state: "Berlin",
        zip: "10117",
        country: "Germany"
      },
      billingAddress: {
        street: "Friedrichstraße 100",
        city: "Berlin",
        state: "Berlin",
        zip: "10117",
        country: "Germany"
      }
    },
    { 
      id: "#ORD-7424", 
      customer: "David Miller", 
      email: "david@miller.net",
      phone: "+61 2 9123 4567",
      items: 2, 
      total: "$120.00", 
      status: "Cancelled", 
      date: "Mar 22, 2024",
      shippingAddress: {
        street: "10 Bridge St",
        city: "Sydney",
        state: "NSW",
        zip: "2000",
        country: "Australia"
      },
      billingAddress: {
        street: "10 Bridge St",
        city: "Sydney",
        state: "NSW",
        zip: "2000",
        country: "Australia"
      }
    },
    { 
      id: "#ORD-7425", 
      customer: "Lisa Thompson", 
      email: "lisa.t@example.com",
      phone: "+1 (416) 123-4567",
      items: 1, 
      total: "$45.00", 
      status: "Pending", 
      date: "Mar 25, 2024",
      shippingAddress: {
        street: "250 Front St W",
        city: "Toronto",
        state: "ON",
        zip: "M5V 3G5",
        country: "Canada"
      },
      billingAddress: {
        street: "250 Front St W",
        city: "Toronto",
        state: "ON",
        zip: "M5V 3G5",
        country: "Canada"
      }
    },
  ]);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const stats = [
    { label: "Total Orders", value: orders.length.toString(), icon: <ShoppingBag className="w-5 h-5" />, color: "bg-indigo-500" },
    { label: "Pending", value: orders.filter(o => o.status === "Pending").length.toString(), icon: <Clock className="w-5 h-5" />, color: "bg-amber-500" },
    { label: "Completed", value: orders.filter(o => o.status === "Completed" || o.status === "Delivered").length.toString(), icon: <CheckCircle2 className="w-5 h-5" />, color: "bg-emerald-500" },
    { label: "Cancelled", value: orders.filter(o => o.status === "Cancelled").length.toString(), icon: <XCircle className="w-5 h-5" />, color: "bg-rose-500" },
  ];

  const updateStatus = (id: string, newStatus: Order["status"]) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    setActiveMenu(null);
  };

  const cancelOrder = (id: string) => updateStatus(id, "Cancelled");
  const markAsDelivered = (id: string) => updateStatus(id, "Delivered");

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">E-commerce Orders</h1>
          <p className="text-gray-500 font-medium mt-1">Manage and track all customer transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by order ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <span>Showing {orders.length} orders</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Items</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td 
                    className="px-6 py-4 font-black text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => setSelectedOrder(order)}
                  >
                    {order.id}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.items} Items</td>
                  <td className="px-6 py-4 font-black text-gray-900">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                      order.status === 'Delivered' ? 'bg-indigo-50 text-indigo-600' :
                      order.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100 shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setActiveMenu(activeMenu === order.id ? null : order.id)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100 shadow-sm"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {activeMenu === order.id && (
                        <div className="absolute right-6 mt-1 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                          <button 
                            onClick={() => updateStatus(order.id, "Completed")}
                            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Mark Completed
                          </button>
                          <button 
                            onClick={() => markAsDelivered(order.id)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                          >
                            <Truck className="w-4 h-4" />
                            Mark Delivered
                          </button>
                          <button 
                            onClick={() => cancelOrder(order.id)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-indigo-600">
                  <Package className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Order {selectedOrder.id}</h2>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{selectedOrder.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider ${
                      selectedOrder.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                      selectedOrder.status === 'Delivered' ? 'bg-indigo-50 text-indigo-600' :
                      selectedOrder.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {selectedOrder.status}
                    </span>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-3 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-2xl transition-all shadow-sm border border-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Customer Details */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-gray-50/30 rounded-3xl p-6 border border-gray-50">
                     <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                       <Users className="w-5 h-5 text-indigo-500" />
                       Customer Information
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
                             <Users className="w-5 h-5" />
                           </div>
                           <div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</p>
                             <p className="text-sm font-black text-gray-900">{selectedOrder.customer}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
                             <MailIcon className="w-5 h-5" />
                           </div>
                           <div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                             <p className="text-sm font-black text-gray-900">{selectedOrder.email}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
                             <Phone className="w-5 h-5" />
                           </div>
                           <div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                             <p className="text-sm font-black text-gray-900">{selectedOrder.phone}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
                             <CreditCard className="w-5 h-5" />
                           </div>
                           <div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Method</p>
                             <p className="text-sm font-black text-gray-900">Visa ending in 4242</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Items Summary */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-black text-gray-900 mb-6">Order Items ({selectedOrder.items})</h3>
                    <div className="space-y-4">
                      {Array.from({ length: selectedOrder.items }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 px-2 rounded-xl transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-gray-300 group-hover:scale-105 transition-transform">
                              <ShoppingBag className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-sm font-black text-gray-900">Premium Product Item #{i + 1}</p>
                               <p className="text-xs font-bold text-gray-400">SKU: PRD-{1000 + i}</p>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-black text-gray-900">$45.00</p>
                             <p className="text-xs font-bold text-gray-400">Qty: 1</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Addresses */}
                <div className="space-y-6">
                   <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100">
                      <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-indigo-300" />
                        Shipping Address
                      </h3>
                      <div className="space-y-1 text-sm font-medium text-indigo-100">
                        <p className="text-white font-black text-base mb-2">{selectedOrder.customer}</p>
                        <p>{selectedOrder.shippingAddress.street}</p>
                        <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}</p>
                        <p className="uppercase tracking-widest text-[10px] font-black mt-4">{selectedOrder.shippingAddress.country}</p>
                      </div>
                   </div>

                   <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-gray-300" />
                        Billing Address
                      </h3>
                      <div className="space-y-1 text-sm font-medium text-gray-500">
                        <p className="text-gray-900 font-black text-base mb-2">{selectedOrder.customer}</p>
                        <p>{selectedOrder.billingAddress.street}</p>
                        <p>{selectedOrder.billingAddress.city}, {selectedOrder.billingAddress.state} {selectedOrder.billingAddress.zip}</p>
                        <p className="uppercase tracking-widest text-[10px] font-bold mt-4 text-gray-400">{selectedOrder.billingAddress.country}</p>
                      </div>
                   </div>

                   <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                      <h3 className="text-lg font-black text-gray-900 mb-4">Total Amount</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm font-bold text-gray-400">
                          <span>Subtotal</span>
                          <span className="text-gray-900">$215.00</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-400">
                          <span>Shipping</span>
                          <span className="text-gray-900">$30.00</span>
                        </div>
                        <div className="h-px bg-gray-200 my-4" />
                        <div className="flex justify-between text-lg font-black text-gray-900">
                          <span>Total</span>
                          <span className="text-indigo-600">{selectedOrder.total}</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  <button 
                     onClick={() => updateStatus(selectedOrder.id, "Delivered")}
                     className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                  >
                    <Truck className="w-4 h-4" />
                    Mark as Delivered
                  </button>
                  <button 
                     onClick={() => cancelOrder(selectedOrder.id)}
                     className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-rose-500 rounded-2xl text-sm font-bold hover:bg-rose-50 hover:border-rose-200 transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel Order
                  </button>
               </div>
               <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
                  <ExternalLink className="w-4 h-4" />
                  Print Invoice
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcomOrdersPage;
