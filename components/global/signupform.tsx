"use client"

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
import {  signUpEmail } from "@/actions/user.action";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {

  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    setIsPending(true)
    
    const formdata = new FormData(evt.currentTarget)

    const { error } = await signUpEmail(formdata)

     if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Signup Success. You're all set.");
      router.push("/auth/signin");
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
          <div className="flex gap-4 w-full justify-center items-center">
            <div className="grid mt-4">
              <OauthButton provider="google" signUp></OauthButton>
            </div>
            <div className="grid mt-4">
              <OauthButton provider="facebook" signUp />
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
