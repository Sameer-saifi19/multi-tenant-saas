import { Bell, CreditCard, Home, Library, Settings } from "lucide-react";

export const sidebarItemContent
 = (workspaceId: string): {title:string, href: string; icon:React.ReactNode}[] => [
    {title:"Home",
    href:`/dashboard/${workspaceId}/home`, 
    icon: <Home className="h-5 w-5"/>},

    {title:"My Library", 
    href:`/dashboard/${workspaceId}`, 
    icon: <Library className="h-5 w-5"/>},

    {title:"Notifications", 
    href:`/dashboard/${workspaceId}/notifications`, icon: <Bell className="h-5 w-5"/>},

    {title:"Billing",
    href:`/dashboard/${workspaceId}/billing`, 
    icon: <CreditCard className="h-5 w-5"/>},

    {title:"Settings", 
    href:`/dashboard/${workspaceId}/settings`,
    icon: <Settings className="h-5 w-5"/>},
 

]