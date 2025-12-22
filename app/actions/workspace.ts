"use server";

import prisma from "@/lib/prisma";
import { checkSession } from "./user";
import { createGymInput } from "@/schema";
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
  const auth = await checkSession();

  if (!auth) return { status: 404, message: "Unauthorized" };

  const authorized = await prisma.user.findUnique({
    where: {
      id: auth.userId,
    },
  });

  try {
    if (!authorized) return { status: 404, message: "User not found" };

    const createWorkspace = await prisma.workspace.create({
      data: {
        user: {
          connect: {
            id: authorized.id,
          },
        },
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
    });
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
