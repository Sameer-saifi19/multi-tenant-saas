"use server";

import prisma from "@/lib/prisma";
import { checkSession, currentUser } from "./user";
import { createGymInput, createGymSchema } from "@/schema";
import { redirect } from "next/navigation";

export const getWorkspaces = async () => {
  const auth = await checkSession();

  if (!auth) return { status: 404, message: "Unauthenticated" };

  try {
    const workspaces = await prisma.user.findUnique({
      where: {
        id: auth.userId,
      },
      select: {
        workspaces: true,
        members: true,
        subsription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (workspaces)
      return {
        status: 200,
        data: workspaces,
      };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
};

export const createGymAction = async (formData: createGymInput) => {
  const auth = await checkSession();
  if (!auth) return { status: 403, message: "Unauthenticated" };

  const parsed = createGymSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      status: 400,
      message: "Invalid input data",
      error: parsed.error,
    };
  }

  try {
    const createWorkspace = await prisma.workspace.create({
      data: {
        ...parsed.data,
        userId: auth.userId,
      },
    });

    return { status: 200, data: createWorkspace };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getAllWorkspace = async (userId: string) => {
  const auth = await checkSession();
  if (!auth) {
    redirect("/auth/sign-in");
  }

  try {
    const workspace = await prisma.workspace.findMany({
      where: {
        userId: auth.userId,
      },
    });

    if (!workspace || workspace.length < 1)
      return {
        status: 404,
        message: "No workspace found",
      };

    return { status: 200, data: workspace };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const hasAccessToWorkspace = async (workspaceId: string) => {
  const auth = await checkSession();

  if (!auth)
    return {
      status: 403,
      message: "unauthenticated",
    };

  try {
    const findFirstWorksapce = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
      },
    });

    if (findFirstWorksapce)
      return {
        status: 400,
        message: "got first workspace",
        data: findFirstWorksapce,
      };

    return { status: 400, message: "Could not get workspace" };
  } catch (error) {
    console.log("error from hasAccessToWorkspace", error);
    return { status: 500 };
  }
};
