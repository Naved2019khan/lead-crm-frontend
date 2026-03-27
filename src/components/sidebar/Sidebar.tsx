"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, LogOut, Building2 } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/constants/navigation";

export interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  children?: NavItem[];
}

interface NavItemProps {
  item: NavItem;
  onClick?: () => void;
}

const NavItemComponent = ({ item, onClick }: NavItemProps) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const isActive = (href: string) => pathname === href;

  const isParentActive = (item: NavItem) => {
    if (isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return false;
  };

  const active = isParentActive(item);

  useEffect(() => {
    if (active && hasChildren) {
      setIsExpanded(true);
    }
  }, [active, hasChildren]);

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="mb-0.5">
      <Link
        href={item.href}
        onClick={handleClick}
        className={`
          group relative flex items-center justify-between gap-3 px-3 py-2 text-sm font-bold rounded-xl transition-all duration-200
          ${active
            ? "bg-indigo-50/50 text-indigo-600"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`
            flex items-center justify-center w-8 h-8 rounded-lg transition-all
            ${active ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-gray-100 text-gray-400 group-hover:bg-white group-hover:text-indigo-500"}
          `}>
            {item.icon}
          </div>
          <span className="tracking-tight">{item.name}</span>
        </div>

        {hasChildren && (
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""
              } ${active ? "text-indigo-400" : "text-gray-300"}`}
          />
        )}
      </Link>

      {/* Children Items */}
      {hasChildren && (
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out pl-4
            ${isExpanded ? "max-h-96 opacity-100 my-1" : "max-h-0 opacity-0"}
          `}
        >
          <div className="border-l border-gray-100 ml-4 py-1">
            {item.children?.map((child) => {
              const childActive = isActive(child.href);
              return (
                <Link
                  key={child.name}
                  href={child.href}
                  onClick={onClick}
                  className={`
                    group flex items-center gap-3 px-4 py-1.5 text-[12px] font-bold transition-all rounded-lg ml-2
                    ${childActive
                      ? "text-indigo-600 bg-indigo-50/30"
                      : "text-gray-400 hover:text-indigo-500 hover:bg-gray-50/50"
                    }
                  `}
                >
                  <div className={`w-1 h-1 rounded-full transition-all ${childActive ? "bg-indigo-600 scale-125" : "bg-gray-200 group-hover:bg-indigo-300"}`} />
                  {child.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const UserProfile = () => {
  let session;

  const userInitials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("") || "U";

  const userName = session?.user?.name || "Access Interface";
  const userRole = (session?.user as any)?.role || "Executive Node";

  return (
    <div className="mt-auto p-4 border-t border-gray-50">
      <div className="p-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[12px] font-black shadow-sm">
            {userInitials}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-black text-gray-900 truncate tracking-tight">
            {userName}
          </p>
          <p className="text-[9px] font-bold text-gray-400 truncate uppercase tracking-widest">{userRole}</p>
        </div>
        <button
          // onClick={() => signOut()}
          className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-950/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 shadow-sm
          transform transition-all duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Distinct Header Section */}
          <div className="p-6 mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-100">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-black text-gray-900 tracking-tighter leading-none mb-0.5">
                    LEAD<span className="text-indigo-600">BOX</span>
                  </h1>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Neural CRM</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search/Quick Action Area (Optional Aesthetic Placeholder) */}
          {/* Removed the extra secondary cards to keep it clean */}

          {/* Scrollable Navigation Area */}
          <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto custom-scrollbar">
            {NAVIGATION_ITEMS.map((item) => (
              <NavItemComponent key={item.href} item={item} onClick={onClose} />
            ))}
          </nav>

          {/* User Profile Section at Bottom */}
          <UserProfile />
        </div>
      </aside>
    </>
  );
};
