import DashboardHeader from "@/components/headers/DashboardHeader";
import { Sidebar } from "@/components/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" bg-gray-50 ">
      <Sidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
