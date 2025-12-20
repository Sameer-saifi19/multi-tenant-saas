"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGymSchema } from "@/schema";
import { Label } from "recharts";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {};

export default function createGymForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createGymSchema),
    mode: "onBlur",
  });
  return (
    <>
      <main className="h-screen flex justify-center items-center">
        <div className={cn("flex flex-col gap-6 w-full max-w-2xl")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl uppercase">
                Create your gym
              </CardTitle>
              <CardDescription className="text-center">
                To get started, Enter your first gym details
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label>name</Label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="eg. Iron den gym"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>phone</Label>
                    <Input
                      name=""
                      type="text"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      type="text"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      type="text"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      type="text"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      type="text"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      type="text"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full text-white">
                      Create Gym
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
