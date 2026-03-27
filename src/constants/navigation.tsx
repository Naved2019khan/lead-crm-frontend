import {
  LayoutDashboard, Layers, Settings, Users2, BookOpen,
  Globe2, ShoppingBag, Mailbox, Sparkles, FlaskConical,
  Plane, Magnet, Boxes, ListOrdered, ShieldCheck
} from "lucide-react";

export interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  children?: NavItem[];
  superAdminOnly?: boolean;
  gradient?: string;
  shadow?: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="w-[18px] h-[18px]" />,
    href: "/dashboard",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/30",
  },
  {
    name: "All leads",
    icon: <Layers className="w-[18px] h-[18px]" />,
    href: "/dashboard/all-leads",
    gradient: "from-violet-500 to-fuchsia-600",
    shadow: "shadow-fuchsia-500/30",
    children: [
      {
        name: "Software Agency",
        icon: <Boxes className="w-4 h-4" />,
        href: "/dashboard/leads",
      },
      {
        name: "Flight Lead",
        icon: <Plane className="w-4 h-4" />,
        href: "/dashboard/flight-leads",
      },
    ],
  },
  {
    name: "Manual booking",
    icon: <BookOpen className="w-[18px] h-[18px]" />,
    href: "/dashboard/manual-booking",
    gradient: "from-emerald-400 to-teal-600",
    shadow: "shadow-emerald-500/30",
  },
  {
    name: "Leads Site",
    icon: <Globe2 className="w-[18px] h-[18px]" />,
    href: "/dashboard/all-agency-sites",
    gradient: "from-amber-400 to-orange-500",
    shadow: "shadow-orange-500/30",
  },
  {
    name: "Capture Lead",
    icon: <Magnet className="w-[18px] h-[18px]" />,
    href: "/dashboard/capture-lead",
    gradient: "from-rose-400 to-red-600",
    shadow: "shadow-rose-500/30",
  },
  {
    name: "Flight Site",
    icon: <Plane className="w-[18px] h-[18px]" />,
    href: "/dashboard/all-flight-sites",
    gradient: "from-cyan-400 to-sky-600",
    shadow: "shadow-cyan-500/30",
  },
  {
    name: "Users",
    icon: <Users2 className="w-[18px] h-[18px]" />,
    href: "/dashboard/user-listing",
    superAdminOnly: true,
    gradient: "from-indigo-400 to-purple-600",
    shadow: "shadow-purple-500/30",
  },
  {
    name: "Mailing List",
    icon: <Mailbox className="w-[18px] h-[18px]" />,
    href: "/dashboard/email-subscribe",
    superAdminOnly: true,
    gradient: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-500/30",
  },
  {
    name: "E-commerce",
    icon: <ShoppingBag className="w-[18px] h-[18px]" />,
    href: "/dashboard/ecom",
    gradient: "from-lime-400 to-green-600",
    shadow: "shadow-green-500/30",
    children: [
      {
        name: "Ecom Orders",
        icon: <ListOrdered className="w-4 h-4" />,
        href: "/dashboard/ecom/orders",
      },
      {
        name: "Ecom Users",
        icon: <Users2 className="w-4 h-4" />,
        href: "/dashboard/ecom/users",
      },
      {
        name: "Features",
        icon: <Sparkles className="w-4 h-4" />,
        href: "/dashboard/ecom/features",
      },
    ],
  },
  {
    name: "Settings",
    icon: <Settings className="w-[18px] h-[18px]" />,
    href: "/dashboard/settings",
    superAdminOnly: true,
    gradient: "from-slate-500 to-gray-700",
    shadow: "shadow-gray-500/30",
  },
  {
    name: "Role Tester",
    icon: <ShieldCheck className="w-[18px] h-[18px]" />,
    href: "/dashboard/test",
    superAdminOnly: true,
    gradient: "from-fuchsia-500 to-pink-600",
    shadow: "shadow-pink-500/30",
  },
];
