import { getAllMembers } from "@/actions/members";
import Navbar from "@/components/global/Navbar";
import AppSidebar from "@/components/global/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["all-members"],
    queryFn: () => getAllMembers(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(query)}>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <Navbar />
            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      </HydrationBoundary>
    </>
  );
};

export default Layout;
