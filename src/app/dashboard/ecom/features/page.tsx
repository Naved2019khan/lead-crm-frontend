"use client";

import React from "react";
import { 
  Package, 
  Tag, 
  Layers, 
  Plus,
  Search,
  Grid,
  List,
  ChevronRight,
  TrendingUp,
  Star
} from "lucide-react";

const EcomFeaturesPage = () => {
  const cards = [
    { 
      title: "Product Inventory", 
      count: "1,240", 
      desc: "Manage your SKU catalog", 
      icon: <Package className="w-6 h-6" />, 
      color: "from-blue-500 to-indigo-600" 
    },
    { 
      title: "Categories", 
      count: "18", 
      desc: "Organize products by type", 
      icon: <Layers className="w-6 h-6" />, 
      color: "from-purple-500 to-pink-600" 
    },
    { 
      title: "Active Coupons", 
      count: "12", 
      desc: "Promotional campaigns", 
      icon: <Tag className="w-6 h-6" />, 
      color: "from-amber-400 to-orange-500" 
    },
    { 
      title: "Customer Reviews", 
      count: "842", 
      desc: "Feedback and ratings", 
      icon: <Star className="w-6 h-6" />, 
      color: "from-emerald-400 to-teal-600" 
    },
  ];

  return (
    <div className="p-6 space-y-8 animate-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">E-commerce Features</h1>
          <p className="text-gray-500 font-medium mt-1">Manage products, categories, and promotions</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
          <Plus className="w-5 h-5" />
          Add New Feature
        </button>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="relative group cursor-pointer">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10 rounded-3xl scale-90`} />
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-transparent transition-all h-full flex flex-col">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-gray-100`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-1">{card.title}</h3>
              <p className="text-sm font-bold text-gray-400 mb-4">{card.desc}</p>
              <div className="mt-auto flex items-center justify-between px-1">
                <span className="text-2xl font-black text-gray-900">{card.count}</span>
                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Highlights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-violet-950 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp className="w-64 h-64 -mr-20 -mt-20" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Store Analytics
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-tight">
              Scale your business <br />
              with smart inventory.
            </h2>
            <p className="text-indigo-200 font-medium max-w-md">
              Our automated system helps you track popular products and suggest restocks before you run out.
            </p>
            <button className="px-6 py-3 bg-white text-indigo-900 rounded-2xl text-sm font-bold hover:bg-gray-100 transition-all shadow-lg">
              View AI Insights
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between group overflow-hidden">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-gray-900">Flash Sale</h3>
            <p className="text-gray-500 font-medium text-sm">
              Schedule your next promotion event and monitor conversion in real-time.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                +12
              </div>
            </div>
            <p className="text-xs font-bold text-gray-400">Collaborators active in this campaign</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcomFeaturesPage;
