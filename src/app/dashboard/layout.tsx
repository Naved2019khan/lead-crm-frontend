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

      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
