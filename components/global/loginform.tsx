'use client'

import { signInEmail } from "@/actions/user.action";
import { OauthButton } from "@/components/global/oauthbtn";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false)

  const router = useRouter()
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
      evt.preventDefault()
      setIsPending(true)
      
      const formdata = new FormData(evt.currentTarget)
  
      const { error } = await signInEmail(formdata)
  
       if (error) {
        toast.error(error);
        setIsPending(false);
      } else {
        toast.success("Login successfully. Welcome to Fitx.");
        router.push("/profile");
      }
    }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card >
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Sign in to your Fitx account
          </CardTitle>
          <CardDescription className="text-center">
            Welcome! Please enter your details to log in
          </CardDescription>
          <div className="flex gap-4 w-full justify-center items-center">
            <div className="grid mt-4">
              <OauthButton provider="google" />
            </div>
            <div className="grid mt-4">
              <OauthButton provider="facebook" />
            </div>
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
                    href="/auth/password-reset"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" type="password" required />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={isPending} className="w-full text-white">
                  Signin to Fitx
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/auth/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
