import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col gap-8 justify-center items-center">
        <h1 className="text-8xl  text-orange-600">HELLO SAAS</h1>
        <div className="flex gap-3 items-center">
          <Link href="/auth/sign-in">
            <Button variant="outline" size="lg">
              Sign in
            </Button>
          </Link>

          <Link href="/auth/sign-up">
            <Button size="lg"> Sign up</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
