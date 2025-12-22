import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Server } from "lucide-react";
import Link from "next/link";

function Herosection() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 z-10">
      <div className="max-w-3xl text-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Authentication Starter Pack
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg">
          A production-ready authentication foundation built with Next.js App
          Router and Better Auth. Designed for correctness, security, and
          scalability.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Feature
            icon={<Server className="h-6 w-6" />}
            title="Server-First Auth"
            description="All session and token validation happens on the server. No client-side trust."
          />
          <Feature
            icon={<Lock className="h-6 w-6" />}
            title="Secure by Default"
            description="Explicit handling of expired and invalid tokens with deterministic redirects."
          />
          <Feature
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Production Patterns"
            description="Clean architecture suitable for SaaS and real-world applications."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pt-10">
          <Button asChild size="lg">
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </div>

        <div>
          <p className="text-muted-foreground">Built with ❤️ by Sameer Saifi</p>
        </div>
      </div>
    </main>
  );
}

export default Herosection;

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-background p-6 text-left space-y-3">
      <div className="text-primary">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
