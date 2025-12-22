"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { createGymInput, createGymSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutationData } from "@/hooks/use-mutation";
import { createGymAction } from "@/app/actions/workspace";

export default function CreateWorkspace() {
  const { register, handleSubmit } = useForm<createGymInput>({
    resolver: zodResolver(createGymSchema),
    mode: "onBlur",
  });

  const { mutate, isPending, error } = useMutationData(
    ["workspace"],
    createGymAction
  );

  const onSubmit = async (data: createGymInput) => {
    mutate(data);
    console.log(error);
  };


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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Input
                      {...register("name")}
                      type="text"
                      placeholder="eg. Iron den gym"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Input
                      {...register("slug")}
                      type="text"
                      placeholder="domain.com/iron-den"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Input
                      {...register("phone")}
                      type="text"
                      placeholder="775-224-7654"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Input
                      {...register("addressLine1")}
                      type="text"
                      placeholder="172, new york USA"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Input
                      {...register("city")}
                      type="text"
                      placeholder="Los angeles"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Input
                      {...register("state")}
                      type="text"
                      placeholder="California"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Input
                      {...register("country")}
                      type="text"
                      placeholder="USA"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Input
                      {...register("postalCode")}
                      type="text"
                      placeholder="16253"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Input {...register("openingTime")} type="time" required />
                  </div>

                  <div className="grid gap-3">
                    <Input {...register("closingTime")} type="time" required />
                  </div>

                  <div className="grid gap-3">
                    <Input
                      {...register("openDays")}
                      type="text"
                      placeholder="mon to sat"
                    />
                  </div>

                  <div>
                    <Input
                      type="number"
                      {...register("maxMembers", { valueAsNumber: true })}
                      placeholder="Maximum members"
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
