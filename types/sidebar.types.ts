export interface sidebarUser {
  id: string;
  name: string;
}

export interface sidebarWorkspace {
  id: string;
  name: string;
}

export interface workspaceLayoutProps {
  user: sidebarUser;
  workspaces: sidebarWorkspace[];
  params?: { workspaceId: string };
  children?: React.ReactNode;
}

export interface appSidebarProps {
  activeWorkspaceId: string;
  children: React.ReactNode;
  user: sidebarUser
  workspaces: sidebarWorkspace[]
}
