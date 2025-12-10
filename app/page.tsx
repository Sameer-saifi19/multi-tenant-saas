"use client";

import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = useSession();

  if (session?.user.role === "USER") {
    return <h1>{session.user.name}</h1>;
  }

  return <>
  <h1>{session?.user.name}</h1></>;
}
