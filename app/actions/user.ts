"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signupEmailAction = async (formdata: FormData) => {
  const name = String(formdata.get("name"));
  const email = String(formdata.get("email"));
  const password = String(formdata.get("password"));

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return { status: 200, message: "Success" };
  } catch (error) {
    return {
      status: 500,
      message: "something went wrong",
    };
  }
};

export const signinEmailAction = async (formdata: FormData) => {
  const email = String(formdata.get("email"));
  const password = String(formdata.get("password"));

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { status: 200, message: "Success" };
  } catch (error) {
    if (error instanceof APIError)
      return {
        status: 500,
        message: "Invalid Email or Password",
      };
  }
};

export const changePasswordAction = async (formData: FormData) => {
  const currentPassword = String(formData.get("currentPassword"));
  if (!currentPassword) return { error: "Please enter your current password" };

  const newPassword = String(formData.get("newPassword"));
  if (!newPassword) return { error: "Please enter your new password" };

  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword,
        newPassword,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal Server Error" };
  }
};

export const checkSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }
  return session.session;
};

export const currentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      workspaces: {
        where: {
          userId: session?.user.id,
        },
      },
    },
  });

  if (!user) {
    return { status: 401, message: "Unauthorized" };
  }

  return { user };
};

export const onAuthenticateUser = async () => {
  const auth = await checkSession();

  if (!auth) return { status: 403, message: "Unauthenticated" };

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        id: auth.userId,
      },
      include: {
        workspaces: {
          where: {
            id: auth.userId,
          },
        },
      },
    });

    if (userExist)
      return {
        status: 200,
        user: userExist,
      };

    const newUser = await prisma.user.update({
      where: {
        id: auth.userId,
      },
      data: {
        workspaces: {
          create: [],
        },
        subsription: {
          create: {},
        },
      },
      include: {
        workspaces: true,
      },
    });

    if (newUser) {
      return { status: 201, data: newUser };
    }

    return { status: 400 };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong" };
  }
};
