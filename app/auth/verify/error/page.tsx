"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangleIcon } from "lucide-react";

export default function VerifyErrorPage() {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <AlertTriangleIcon className="h-8 w-8 text-yellow-500" />
          </div>
          <CardTitle className="text-xl">
            Verification link invalid
          </CardTitle>
          <CardDescription>
            This verification link is expired or has already been used.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center text-sm">
          <a
            href="/auth/verify/resend"
            className="underline underline-offset-4"
          >  
            Resend verification email
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
