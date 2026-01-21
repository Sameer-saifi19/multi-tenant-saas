import { currentUser } from "@/app/actions/user";
import { getAllWorkspace } from "@/app/actions/workspace";
import Navbar from "@/components/global/navbar/index";
import AppSidebar from "@/components/global/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

export default async function WorkspaceLayout({ children, params }: Props) {
  const user = await currentUser();
  const { workspaceId } = await params;
  const workpsaceResponse = await getAllWorkspace(user.user?.id as string);
  const workpsace = workpsaceResponse.data || [];

  const query = new QueryClient();

  return (
    <>
      <HydrationBoundary state={dehydrate(query)}>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar
            workspaces={workpsace}
            user={user.user!}
            activeWorkspaceId={workspaceId} />
           <main className="w-full h-screen">
            <Navbar />
            <div className="p-6">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </HydrationBoundary>
    </>
  );
}
