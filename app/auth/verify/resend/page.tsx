import SendVerificationEmailForm from "@/app/auth/_components/verify-email-form";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const token = await searchParams;

  return <SendVerificationEmailForm />;
}
