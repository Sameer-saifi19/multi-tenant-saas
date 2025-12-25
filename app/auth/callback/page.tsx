import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await onAuthenticateUser();

  if (!auth) return { status: 403 };

  if (auth.status === 200 || auth.status === 201) {
    redirect(`/workspace/${auth.user?.workspaces[0].id}`);
  }

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    redirect("/auth/sign-in");
  }
}


