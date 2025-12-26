import { redirect } from "next/navigation";
import { checkSession, onAuthenticateUser } from "../actions/user";
import { hasAccessToWorkspace } from "../actions/workspace";

const Workspace = async () => {
  const session = await checkSession();
  if (!session) return { status: 403, message: "Unauthenticated" };
  const authentication = await onAuthenticateUser();

  const hasAccess = await hasAccessToWorkspace(
    authentication.data?.workspaces[0].id as string
  );

  if(hasAccess.status === 200) {
    return redirect(`/workspace/${hasAccess.data?.id}`)
  }

  if(hasAccess.status === 400 || hasAccess.status === 500){
    return redirect('/onboarding')
  }

  return <div>Workspace</div>;
};

export default Workspace;
