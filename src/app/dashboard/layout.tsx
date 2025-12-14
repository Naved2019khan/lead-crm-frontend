import DashboardHeader from "@/components/headers/DashboardHeader";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SessionProvider } from "next-auth/react";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>

    <div className=" bg-gray-50 ">
      <Sidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
