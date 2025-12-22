import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.EXPRESS_PUBLIC_API_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const {
  signUp,
  signIn,
  signOut,
  getSession,
  useSession,
  resetPassword,
  sendVerificationEmail,
  requestPasswordReset,
} = authClient;
