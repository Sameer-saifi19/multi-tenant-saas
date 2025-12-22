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
import { sendVerificationEmail } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { MailIcon, ArrowLeftIcon } from "lucide-react";

export default function SendVerificationEmailForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));

    if (!email) {
      return toast.error("Please enter your email address.");
    }

    await sendVerificationEmail({
      email,
      callbackURL: "/auth/verify",
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: () => {
          toast.error(
            "If an account exists for this email, we&apos;ve sent a verification link."
          );
        },
        onSuccess: () => {
          toast.success("Verification email sent successfully.");
        },
      },
    });
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <MailIcon className="h-8 w-8 text-primary" />
          </div>

          <CardTitle className="text-xl">Resend Verification Email</CardTitle>

          <CardDescription>
            Enter your email address and we&apos;ll again send you a new
            verification link.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Enter email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full text-white"
              >
                Resend verification email
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <ArrowLeftIcon className="h-4 w-4" />
              <a href="/auth/sign-in" className="underline underline-offset-4">
                Back to sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
