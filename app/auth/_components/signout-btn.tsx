"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleClick() {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("You&apos;ve logged out. See you soon!");
          router.push("/auth/sign-in");
        },
      },
    });
  }

  return (
    <DropdownMenuItem
      onClick={handleClick}
      variant="destructive"
      disabled={isPending}
      
    >
      Sign out
    </DropdownMenuItem>
  );
};
