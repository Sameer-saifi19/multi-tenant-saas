import { checkSession } from "@/app/actions/user";
import { getAllWorkspace } from "@/app/actions/workspace";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({params}: Props){

  const param = await params;
  const auth = await checkSession()

  if(!auth){
    redirect('auth/sign-in')
  }

  // const allWorkspace = await getAllWorkspace(auth.session?.user.id as string)
  return (
    <>
      {/* <h1>Hello, {param.slug}</h1>
      {allWorkspace.data?.map((w) => {
        return <div key={w.id}>
          <h1>{w.name}</h1>
        </div>
      })} */}
    </>
  )
}