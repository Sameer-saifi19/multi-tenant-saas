import { signIn } from "@/auth";
import { Button } from "./ui/button";

export function Googlebtn(){
    return (
        <>
            <Button variant="outline" onClick= {() => signIn('google')} className="w-full gap-4 flex">
               Google
            </Button>
        </>
    )
}

export function Applebtn(){
    return (
        <>
            <Button variant="outline" onClick={() => signIn('apple')} className="w-full gap-4 flex">
                Apple
            </Button>
        </>
    )
}