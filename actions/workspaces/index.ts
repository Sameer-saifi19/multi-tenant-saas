"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createWorkspaceAction = async (formdata: FormData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return { error: "unauthorized" };
  }

  const userId = session.user.id;

  const gymName = formdata.get("orgName") as string;
  if (!gymName) return { error: "Gym Name is required" };
  const address = formdata.get("address") as string;
  const description = formdata.get("description") as string;

  try {
    await prisma.workspace.create({
      data: {
        orgName: gymName,
        address,
        description,
        userId: userId,
      },
    });
    return { success: true };
  } catch (error: any) {
    return { error: "Something went wrong" };
  }
};
