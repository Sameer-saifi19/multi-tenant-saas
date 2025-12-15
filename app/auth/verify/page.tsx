"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";

export default function Page() {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <MailIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl">
            Check your email
          </CardTitle>
          <CardDescription>
            We&apos;ve sent a verification link to your email address.
            Please verify your email to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center text-sm">
          Didn&apos;t receive the email?  
          <a
            href="/auth/verify/resend"
            className="ml-1 underline underline-offset-4"
          >
            Resend verification email
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
