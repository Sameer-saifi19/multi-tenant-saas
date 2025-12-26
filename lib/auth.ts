import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";
import { sendEmailAction } from "@/app/actions/emails";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { normalizeName, ValidDomains } from "./utils";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autosignin: false,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 24 * 60 * 60,

    sendResetPassword: async ({ user, url }) => {
      const email = user.email.endsWith("@example.com")
        ? "sameerk1710@gmail.com"
        : user.email;

      void sendEmailAction({
        to: email,
        subject: "Reset your password",
        meta: {
          description: "Please click the link below to reset your password.",
          link: String(url),
        },
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autosigninAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const email = user.email.endsWith("@example.com")
        ? "sameerk1710@gmail.com"
        : user.email;

      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await sendEmailAction({
        to: email,
        subject: "Verify your email address",
        meta: {
          description:
            "Please verify your email address to complete the registration process.",
          link: String(url),
        },
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1].toLowerCase();

        if (!ValidDomains().includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain. Please use a valid email.",
          });
        }

        const name = normalizeName(ctx.body.name);

        return {
          context: { ...ctx, body: { ...ctx.body, name } },
        };
      }
    }),
  },
  session: {
    expiresIn: 24 * 60 * 60,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },

  plugins: [nextCookies()],
});
