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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createWorkspaceAction } from "@/actions/workspaces";
// import { createWorkspace } from "@/actions/workspace.action";

export default function CreateWorkspacePage() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    const { error } = await createWorkspaceAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Workspace created successfully");
      router.push("/dashboard");
    }
  }

  return (
    <div className={cn("flex min-h-screen items-center justify-center px-4")}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Create your Gym Workspace
          </CardTitle>
          <CardDescription className="text-center">
            This will be your main gym dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label>Gym Name</Label>
                <Input name="orgName" placeholder="FitX Gym" required />
              </div>

              <div className="grid gap-2">
                <Label>Address</Label>
                <Input
                  name="address"
                  placeholder="eg. 23/1 Bank street, New York USA"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  placeholder="Premium fitness center with modern equipment"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full text-white"
              >
                Create Workspace
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
