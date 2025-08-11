import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard(){
    const session = await auth();
    if(!session){
        redirect('/auth/signin')
    }
    return(
        <>
            <div>Hello</div>
        </>
    )
}

