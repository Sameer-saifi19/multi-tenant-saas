import ResetPasswordForm from "@/components/global/reset-pass-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/signin");

  return <ResetPasswordForm token={token} />;
}
