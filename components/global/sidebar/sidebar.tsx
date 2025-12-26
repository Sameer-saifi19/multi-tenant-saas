"use client";

import { sidebarItemContent } from "@/app/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import SidebarItems from "./sidebar-items";
import { appSidebarProps } from "@/types/workspaceLayout.types";
import { useRouter } from "next/navigation";

const AppSidebar = ({
  activeWorkspaceId,
  user,
  workspaces,
}: appSidebarProps) => {
  const itemContent = sidebarItemContent(activeWorkspaceId);
  const router = useRouter();

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/workspace/${value}`);
  };

  const currentWorkspacePlaceholder = workspaces.find((s) => s.id === activeWorkspaceId)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Dumbbell />
                <span className="text-2xl font-bold text-black tracking-widest ml-2">
                  FITX
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuItem>
            <Select onValueChange={onChangeActiveWorkspace}>
              <SelectTrigger className="w-full cursor-pointer mt-4 text-neutral-400 bg-transparent">
                <SelectValue placeholder={currentWorkspacePlaceholder?.name}> </SelectValue>
                <SelectContent align="start">
                  <SelectGroup>
                    <SelectLabel>Workspaces</SelectLabel>
                    <Separator />
                    {workspaces.map((workpsace) => (
                      <SelectItem value={workpsace.id} key={workpsace.id}>
                        {workpsace.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {itemContent.map((item) => (
            <SidebarItems
              key={item.href}
              icon={item.icon}
              href={item.href}
              title={item.title}
            ></SidebarItems>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
