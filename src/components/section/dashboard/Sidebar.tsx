"use client"
import { BarChart3, Home, Settings, Users, X } from "lucide-react";
import { useState } from "react";
interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}


export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState
  (false);

  const navigation: NavItem[] = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/dashboard" },
    { name: "All leads", icon: <BarChart3 className="w-5 h-5" />, href: "/dashboard/leads" },
    { name: "Test", icon: <BarChart3 className="w-5 h-5" />, href: "/dashboard/test" },
    { name: "Leads Site", icon: <BarChart3 className="w-5 h-5" />, href: "/dashboard/all-agency-sites" },
    { name: "Software Site", icon: <BarChart3 className="w-5 h-5" />, href: "/dashboard/all-flight-sites" },
    { name: "Users", icon: <Users className="w-5 h-5" />, href: "/dashboard/user-listing" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, href: "#" },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-500 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
