"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth";

export const signUpEmail = async (formdata: FormData) => {
  const name = String(formdata.get("name"));
  if (!name) return { error: "Please enter your name" };

  const email = String(formdata.get("email"));
  if (!email) return { error: "Please enter your email" };

  const password = String(formdata.get("password"));
  if (!password) return { error: "Please enter your password" };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      const errCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again." };
        default:
          return { error: error.message };
      }
    }
    console.log(error);
    return { error: "Internal Server Error" };
  }
};

export const signInEmail = async (formdata: FormData) => {
  const email = String(formdata.get("email"));
  if (!email) return { error: "Please enter your email" };

  const password = String(formdata.get("password"));
  if (!password) return { error: "Please enter your password" };

   try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: '/onboarding'
      },
    });

    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      const errCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again." };
        default:
          return { error: error.message };
      }
    }
    console.log(error);
    return { error: "Internal Server Error" };
  }
};
