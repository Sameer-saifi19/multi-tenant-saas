import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword:{
        enabled: true,
        minPasswordLength: 8
    },
    advanced: {
        database:{
            generateId: false
        }
    },
    socialProviders:{
        google:{
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
        },

        //ADD FACEBOOK OAUTH
        facebook: {
            clientId: String(process.env.FACEBOOK_CLIENT_ID),
            clientSecret: String(process.env.FACEBOOK_CLIENT_SECRET)
        }
    }
    ,
    plugins: [nextCookies()]
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";