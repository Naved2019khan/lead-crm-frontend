"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, LogOut, Building2 } from "lucide-react";
import { NAVIGATION_ITEMS, NavItem } from "@/constants/navigation";

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

  // Extract dynamic styles with fallbacks
  const bgGradient = item.gradient ? `bg-gradient-to-br ${item.gradient}` : "bg-indigo-600";
  const glowShadow = item.shadow ? item.shadow : "shadow-indigo-500/30";

  return (
    <div className="mb-1.5">
      <Link
        href={item.href}
        onClick={handleClick}
        className={`
          group relative flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-semibold rounded-2xl transition-all duration-300 ease-out overflow-hidden
          ${active
            ? "text-gray-900 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 border border-transparent"
          }
        `}
      >
        {/* Subtle active background glow */}
        {active && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-transparent pointer-events-none" />
        )}

        <div className="relative flex items-center gap-3 z-10 w-full">
          {/* Icon Container with beautiful gradients */}
          <div className={`
            relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300
            ${active 
              ? `${bgGradient} text-white shadow-lg ${glowShadow} scale-100 rotate-0` 
              : "bg-gray-100 text-gray-400 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-white group-hover:shadow-md"
            }
          `}>
            {/* If hovering and inactive, apply a subtle gradient to the icon text using CSS wizardry */}
            <div className={`transition-all duration-300 ${!active && "group-hover:text-indigo-500"}`}>
              {item.icon}
            </div>
            
            {/* Active shine effect */}
            {active && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent opacity-50" />
            )}
          </div>

          <span className={`tracking-wide transition-all duration-300 ${active ? "font-bold" : ""}`}>
            {item.name}
          </span>
        </div>

        {hasChildren && (
          <div className={`
            relative z-10 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300
            ${active ? "bg-gray-50 text-gray-900" : "text-gray-300 group-hover:text-gray-500 group-hover:bg-gray-100"}
          `}>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>
        )}
        
        {/* Animated active indicator bar on the left */}
        <div className={`
          absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300
          ${active ? `h-8 ${bgGradient}` : "h-0 bg-transparent"}
        `} />
      </Link>

      {/* Children Items with animated staggering */}
      {hasChildren && (
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out pl-4
            ${isExpanded ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}
          `}
        >
          <div className="border-l-[1.5px] border-gray-100/80 ml-4 py-1 space-y-1 relative">
            {item.children?.map((child, idx) => {
              const childActive = isActive(child.href);
              return (
                <div key={child.name} className="relative">
                  {/* Connecting lines for children */}
                  <div className="absolute w-3 h-[1.5px] bg-gray-100/80 -left-[1.5px] top-1/2 -translate-y-1/2" />
                  
                  <Link
                    href={child.href}
                    onClick={onClick}
                    className={`
                      group flex items-center gap-3 px-4 py-2 text-[13px] font-semibold transition-all duration-300 rounded-xl ml-3 relative
                      ${childActive
                        ? "text-gray-900 bg-gray-50 shadow-sm border border-gray-100"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
                      }
                    `}
                  >
                    <div className={`
                      w-1.5 h-1.5 rounded-full transition-all duration-300 flex-shrink-0
                      ${childActive ? `${bgGradient} scale-125 shadow-sm` : "bg-gray-200 group-hover:bg-indigo-300 group-hover:scale-110"}
                    `} />
                    <span className="truncate">{child.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice/auth-slice";
import { useRouter } from "next/navigation";

export const UserProfile = () => {
  const user = useSelector((state: any) => state.authSlice?.user);
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const userInitials = user?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("") || "U";

  const userName = user?.name || "Access Interface";
  // Just show the first role or "Super Admin"
  const userRole = user?.isSuperAdmin
    ? "Super Admin"
    : (user?.roles?.[0]?.role || "Executive Node");

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/");
  };

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
          onClick={handleLogout}
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
  const user = useSelector((state: any) => state.authSlice?.user);
  const isSuperAdmin = user?.isSuperAdmin || false;

  const filteredNavItems = NAVIGATION_ITEMS.filter(item => {
    if (item.superAdminOnly && !isSuperAdmin) return false;
    return true;
  });

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
            {filteredNavItems.map((item) => (
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
