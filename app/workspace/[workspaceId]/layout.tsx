import { currentUser } from "@/app/actions/user";
import { getAllWorkspace, hasAccessToWorkspace } from "@/app/actions/workspace";
import AppSidebar from "@/components/global/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

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
            activeWorkspaceId={workspaceId}
          >
            <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
              <div className="mt-4">{children}</div>
            </div>
          </AppSidebar>
        </SidebarProvider>
      </HydrationBoundary>
    </>
  );
}
