import SendVerificationEmailForm from "@/components/global/verify-email-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  return <SendVerificationEmailForm />;
}
