'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";
import { IconType } from "react-icons/lib";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface OauthButtonProps {
  provider: "google" | "github";
  signUp?: Boolean;
  icon?: IconType
}

export const OauthButton = ({ provider, signUp }: OauthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);

    await signIn.social({
      provider,
      callbackURL: "/profile",
      errorCallbackURL: "/auth/signin/error",
    });

    setIsPending(false);
  }

  const action = signUp ? "up" : "in";

  const providerName = provider === "google" ? "Google" : "Github";

  const Icons: Record<OauthButtonProps["provider"], IconType> = {
    google: FaGoogle,
    github: FaGithub,
  };

  const Icon = Icons[provider];

  return (
    <Button
      className="w-full gap-3 flex"
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
    >
      <Icon size={20} />
      Sign {action} with {providerName}
    </Button>
  );
};
