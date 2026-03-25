import { BarChart3, Home, Settings, Users, FileText, Globe, FileSpreadsheet, Mail, Sparkles } from "lucide-react";
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
        href: "/dashboard/flight-leads" 
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
    name: "Capture Lead", 
    icon: <Globe className="w-5 h-5" />, 
    href: "/dashboard/capture-lead" 
  },
  { 
    name: "Flight Site", 
    icon: <Globe className="w-5 h-5" />, 
    href: "/dashboard/all-flight-sites" 
  },
  { 
    name: "Users", 
    icon: <Users className="w-5 h-5" />, 
    href: "/dashboard/user-listing" 
  },
  { 
    name: "Mailing List", 
    icon: <Mail className="w-5 h-5" />, 
    href: "/dashboard/email-subscribe" 
  },
  { 
    name: "E-commerce", 
    icon: <FileSpreadsheet className="w-5 h-5" />, 
    href: "/dashboard/ecom",
    children: [
      { 
        name: "Ecom Orders", 
        icon: <FileSpreadsheet className="w-5 h-5" />, 
        href: "/dashboard/ecom/orders" 
      },
      { 
        name: "Ecom Users", 
        icon: <Users className="w-5 h-5" />, 
        href: "/dashboard/ecom/users" 
      },
      { 
        name: "Other Feature", 
        icon: <Sparkles className="w-5 h-5" />, 
        href: "/dashboard/ecom/features" 
      },
    ]
  },
  { 
    name: "Settings", 
    icon: <Settings className="w-5 h-5" />, 
    href: "/dashboard/settings" 
  },
];

