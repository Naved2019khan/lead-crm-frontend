"use client";
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

 const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState(['reports']);
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.includes(item.name.toLowerCase());
  const parentActive = isParentActive(item);
  function isActive(href : string) { return pathname  === href};

   const toggleExpanded = (itemName : string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  
  function isParentActive(item : NavItem) {
    if (isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return false;
  };

  const handleClick = (e : React.MouseEvent, href : string, item : NavItem) => {
    if(hasChildren) {
      toggleExpanded(item.name.toLowerCase());
      return e.preventDefault();
    }
  };

  return (
            <div key={item.name}>
              {/* Parent Item */}
              <Link
                href={item?.href}
                onClick={(e) => handleClick(e, item.href, item)}
                className={`
                  flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all
                  ${
                    parentActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={parentActive ? 'text-blue-600' : 'text-gray-500'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                
                {hasChildren && (
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </Link>

              {/* Children Items */}
              {hasChildren && isExpanded && (
                <div className="mt-1 ml-8 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={`
                        flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all
                        ${
                          isActive(child.href)
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <span className={isActive(child.href) ? 'text-blue-600' : 'text-gray-400'}>
                        {child.icon}
                      </span>
                      <span>{child.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
};

// ===================================
// 5. Components (components/Sidebar/UserProfile.tsx)
// ===================================
// "use client";
import { useSession } from "next-auth/react";

export const UserProfile = () => {
  const { data: session } = useSession();

  const userInitials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  const userName = session?.user?.name || "Guest User";
  const userEmail = session?.user?.email || "guest@example.com";

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
          {userInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {userName}
          </p>
          <p className="text-xs text-gray-500 truncate">{userEmail}</p>
        </div>
      </div>
    </div>
  );
};

// ===================================
// 6. Main Sidebar Component (components/Sidebar/Sidebar.tsx)
// ===================================
// "use client";
import { X, Menu, ChevronDown } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { NavItem } from "./NavItem";
// import { UserProfile } from "./UserProfile";
// import { SidebarProps } from "@/types/navigation.types";

export const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {NAVIGATION_ITEMS.map((item) => (
              <NavItem key={item.href} item={item} onClick={onClose} />
            ))}
          </nav>

          {/* User Profile */}
          <UserProfile />
        </div>
      </aside>
    </>
  );
};