import { Bell, CreditCard, Home, Library, Settings } from "lucide-react";

export const sidebarItemContent
 = (workspaceId: string): {title:string, href: string; icon:React.ReactNode}[] => [
    {title:"Home",
    href:`/workspace/${workspaceId}/`, 
    icon: <Home className="h-5 w-5"/>},

    {title:"Members", 
    href:`/workspace/${workspaceId}/members`, 
    icon: <Library className="h-5 w-5"/>},

    {title:"Notifications", 
    href:`/workspace/${workspaceId}/notifications`, icon: <Bell className="h-5 w-5"/>},

    {title:"Billing",
    href:`/workspace/${workspaceId}/billing`, 
    icon: <CreditCard className="h-5 w-5"/>},

    {title:"Settings", 
    href:`/workspace/${workspaceId}/settings`,
    icon: <Settings className="h-5 w-5"/>},
 

]