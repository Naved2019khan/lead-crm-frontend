import { BarChart3, Home, Settings, Users, FileText, Globe, FileSpreadsheet } from "lucide-react";
export interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  children?: NavItem[];
} 
export const NAVIGATION_ITEMS: NavItem[] = [
  { 
    name: "Dashboard", 
    icon: <Home className="w-5 h-5" />, 
    href: "/dashboard" 
  },
  { 
    name: "All leads", 
    icon: <BarChart3 className="w-5 h-5" />, 
    href: "/dashboard/all-leads" ,
    children: [
      { 
        name: "Software Agency", 
        icon: <BarChart3 className="w-5 h-5" />, 
        href: "/dashboard/leads" 
      },
      { 
        name: "Flight Lead", 
        icon: <BarChart3 className="w-5 h-5" />, 
        href: "/dashboard/all-flight-sites" 
      },
    ]
  },
  { 
    name: "Manual booking", 
    icon: <FileText className="w-5 h-5" />, 
    href: "/dashboard/manual-booking" 
  },
  { 
    name: "Leads Site", 
    icon: <Globe className="w-5 h-5" />, 
    href: "/dashboard/all-agency-sites" 
  },
  { 
    name: "Software Site", 
    icon: <Globe className="w-5 h-5" />, 
    href: "/dashboard/all-flight-sites" 
  },
  { 
    name: "Users", 
    icon: <Users className="w-5 h-5" />, 
    href: "/dashboard/user-listing" 
  },
  { 
    name: "Blogs", 
    icon: <FileSpreadsheet  className="w-5 h-5" />, 
    href: "/dashboard/blogs-listing" 
  },
  { 
    name: "Settings", 
    icon: <Settings className="w-5 h-5" />, 
    href: "/dashboard/settings" 
  },
];

