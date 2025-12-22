import { ArrowLeftIcon, CheckCircleIcon, MailIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>

          <CardTitle className="text-xl">Check your email</CardTitle>

          <CardDescription>
            If an account exists for the email you entered, we&apos;ve sent a
            secure link to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <MailIcon className="h-4 w-4" />
              <span>The link will expire shortly for security reasons.</span>
            </div>

            <div>
              Didn&apos;t receive the email? Check your spam folder or try
              again.
            </div>

            <div className="mt-4 text-center gap-2 text-sm flex items-center justify-center">
              <ArrowLeftIcon
                className="w-4 h-4 stroke-1 text-black"
                alignmentBaseline="baseline"
              />
              <a
                href="/auth/sign-in"
                className="underline text-black underline-offset-4"
              >
                Back to sign in
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
