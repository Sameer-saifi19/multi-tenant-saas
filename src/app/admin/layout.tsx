import Navbar from "@/components/global/Navbar";
import AppSidebar from "@/components/global/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar/>
        <main className="w-full">
          <Navbar/>
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
