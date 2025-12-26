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
import { toast } from "sonner";

export default function CreateWorkspace() {
  const { register, handleSubmit } = useForm<createGymInput>({
    resolver: zodResolver(createGymSchema),
    mode: "onBlur",
  });

  const { mutate, isPending, error } = useMutationData(
    ["workspace"],
    createGymAction
  );

  const onSubmit = async (formData: createGymInput) => {
    mutate(formData, {
      onSuccess: (res) => {
        if (res.status !== 200) {
          toast(res.message);
          return;
        }
        console.log("workspace created", res.data);
      },
      onError: (err) => {
        toast(err.message);
      },
    });
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    {...register("name")}
                    type="text"
                    placeholder="eg. Iron den gym"
                    required
                  />

                  <Input
                    {...register("slug")}
                    type="text"
                    placeholder="gym slug"
                    required
                  />

                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="john@example.com"
                    required
                  />

                  <Input
                    {...register("phone")}
                    type="text"
                    placeholder="775-224-7654"
                  />

                  <Input
                    {...register("addressLine1")}
                    type="text"
                    placeholder="172, new york USA"
                  />

                  <Input
                    {...register("city")}
                    type="text"
                    placeholder="Los angeles"
                  />

                  <Input
                    {...register("state")}
                    type="text"
                    placeholder="California"
                  />

                  <Input
                    {...register("country")}
                    type="text"
                    placeholder="USA"
                  />

                  <Input
                    {...register("postalCode")}
                    type="text"
                    placeholder="16253"
                  />

                  <Input
                    type="number"
                    {...register("maxMembers", { valueAsNumber: true })}
                    placeholder="Maximum members"
                    required
                  />
                  
                  <Input {...register("openingTime")} type="time" required />

                  <Input {...register("closingTime")} type="time" required />


                  {/* Full width button */}
                  <div className="md:col-span-2">
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
