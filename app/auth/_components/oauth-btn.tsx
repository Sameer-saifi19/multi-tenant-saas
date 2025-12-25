"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { signIn } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

interface OauthButtonProps {
  signUp?: boolean;
}

export const OauthButton = ({ signUp }: OauthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);

    await signIn.social({
      provider: "google",
      callbackURL: "/auth/callback",
      errorCallbackURL: "/auth/sign-in/error",
    });

    setIsPending(false);
  };

  const action = signUp ? "up" : "in";

  return (
    <Button
      className="w-full flex gap-3"
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
    >
      <FaGoogle size={20} />
      Sign {action} with Google
    </Button>
  );
};
