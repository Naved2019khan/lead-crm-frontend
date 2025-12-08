import DashboardHeader from "@/components/headers/DashboardHeader";
import { Sidebar } from "@/components/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-gray-50 mb-8">
      <Sidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
