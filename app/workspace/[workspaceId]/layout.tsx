import { currentUser } from "@/app/actions/user";
import { hasAccessToWorkspace } from "@/app/actions/workspace";
import { redirect } from "next/navigation";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

export default async function WorkspaceLayout({ children, params }: Props) {
  const auth = await currentUser();

  const { workspaceId } = await params;

  const hasAccess = await hasAccessToWorkspace(workspaceId);

  
  console.log(hasAccess)
  return (
    <>
      <div className="mt-4">{children}</div>
    </>
  );
}
