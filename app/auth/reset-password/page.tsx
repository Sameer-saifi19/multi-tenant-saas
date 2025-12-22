import ResetPasswordForm from "@/app/auth/_components/reset-pass-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/sign-in");

  return <ResetPasswordForm token={token} />;
}
