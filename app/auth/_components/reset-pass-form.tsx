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
import { resetPassword } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeftIcon, Eye, EyeOff, LockIcon } from "lucide-react";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isPending, setIsPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (!password || !confirmPassword) {
      return toast.error("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    await resetPassword({
      token,
      newPassword: password,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true)
        },
        onResponse: () => {
          setIsPending(false)
        },
        onError: (ctx) => {
         toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Password reset successfully.");
          router.push("/auth/signin");
        },
      },
    });
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <LockIcon className="h-8 w-8 text-primary" />
          </div>

          <CardTitle className="text-xl">
            Reset your password
          </CardTitle>

          <CardDescription>
            Create a new password for your Fitx account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="password">New password</Label>
               <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon"
                    type="button"
                    variant="ghost"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full text-white"
              >
                Reset password
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <ArrowLeftIcon className="h-4 w-4" />
              <a
                href="/auth/signin"
                className="underline underline-offset-4"
              >
                Back to sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
