"use server";

import prisma from "@/lib/prisma";
import { checkAuth } from "./user";
import { createGymInput } from "@/schema";
import { redirect } from "next/navigation";

export const getWorkspaces = async () => {
  const auth = await checkAuth();

  if (!auth) return { status: 404, message: "Unauthenticated" };

  try {
    const workspaces = await prisma.user.findUnique({
      where: {
        id: auth.session?.user.id,
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

export const createGymAction = async ({
  name,
  email,
  slug,
  phone,
  addressLine1,
  city,
  state,
  postalCode,
  openDays,
  openingTime,
  closingTime,
  country,
  maxMembers,
  logo,
}: createGymInput) => {
  const auth = await checkAuth();

  if (!auth) return { status: 404, message: "Unauthorized" };

  const authorized = await prisma.user.findUnique({
    where: {
      id: auth.session?.user.id
    }
  })



  try {
    const createWorkspace = await prisma.user.create({
      data: {
        workspaces: {
          create: {
            name,
            email,
            slug,
            phone,
            addressLine1,
            city,
            state,
            postalCode,
            openDays,
            openingTime,
            closingTime,
            country,
            maxMembers,
            logo,
          },
        },
      },
    });
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getAllWorkspace = async (userId: string) => {
  const auth = await checkAuth();
  if (!auth) {
    redirect("/auth/sign-in");
  }

  try {
    const workspace = await prisma.workspace.findMany({
      where: {
        userId: auth.session?.user.id,
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
