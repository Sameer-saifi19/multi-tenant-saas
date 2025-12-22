"use server";

import { auth } from "@/lib/auth";
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
    await auth.api.signinEmail({
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

export const checkAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return { status: 403, message: "Unauthenticated" };
  }

  return { session };
};
