import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";

type Props = {
  icon: React.ReactNode;
  href: string;
  title: string;
  selected?: boolean;
};

const SidebarItems = ({ icon, href, title }: Props) => {
  return (
    <SidebarMenuItem className="cursor-pointer my-1.25 z-10">
      <SidebarMenuButton asChild>
        <Link href={href}>
          <div className="flex gap-2 items-center">
            {icon}
            <span>{title}</span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarItems;
