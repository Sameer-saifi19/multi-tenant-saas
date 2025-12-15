import { SignOutButton } from "@/components/global/signout-btn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session){
    redirect('/auth/signin')
  }
  return (
    <>
        <div className="px-8 py-16 container mx-auto max-w-5xl space-y-4">
            <SignOutButton/>
            <pre className="text-sm overflow-clip">
                {JSON.stringify(session, null, 2 )}
            </pre>
        </div>
    </>
  );
}
