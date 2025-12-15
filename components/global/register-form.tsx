"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { OauthButton } from "./oauth-btn";
import { signupEmailAction } from "@/app/actions/user";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Registerform() {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsPending(true);

    const formdata = new FormData(evt.currentTarget);

    const submit = await signupEmailAction(formdata)

     if (submit?.status !== 200) {
      setIsPending(false);
      toast.error("Something went wrong");
    } else {
      router.push("/auth/verify");
    }

  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Create your Fitx account
          </CardTitle>
          <CardDescription className="text-center">
            Welcome! Please fill in your details to get started
          </CardDescription>

          <div className="grid mt-4">
            <OauthButton signUp />
          </div>

          <div className="flex justify-between items-center mt-2">
            <hr className="w-[47%]" />
            <CardDescription>or</CardDescription>
            <hr className="w-[47%]" />
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    className="absolute top-0 right-1 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon"
                    type="button"
                    variant="ghost"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full text-white"
                >
                  Sign up to continue
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/auth/signin" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
