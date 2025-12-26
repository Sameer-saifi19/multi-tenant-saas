import React from "react";
import { checkSession } from "../actions/user";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = async () => {
  const session = await checkSession();

  return (
    <div className="h-screen flex flex-col space-y-16 justify-center items-center">
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <div className="flex gap-6">
        <Link href="/create-workspace">
          <Button>Create Workspace</Button>
        </Link>

        <Link href={"/workspace"}>
          <Button>Go to workspace</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
