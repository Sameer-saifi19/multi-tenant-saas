'use client'

import { checkSession } from "@/app/actions/user";
import { getAllWorkspace } from "@/app/actions/workspace";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

const page = async (props: Props) => {

  
  const auth = await checkSession();
  
  const getUserWorkspace = await getAllWorkspace(auth.userId);
  if (!getUserWorkspace || getUserWorkspace.data?.length! < 1)
    return <h1>No workspace </h1>;

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        {getUserWorkspace.data?.map((e) => {
          return (
            <div key={e.id}>
              <pre>{JSON.stringify(getUserWorkspace.data, null, 2)}</pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
