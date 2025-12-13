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
        minPasswordLength: 6
    },
    advanced: {
        database:{
            generateId: false
        }
    },
    session:{
        expiresIn: 7 * 24 * 60 * 60 
    },
    socialProviders:{
        google:{
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
        },

        facebook: {
            clientId: String(process.env.FACEBOOK_CLIENT_ID),
            clientSecret: String(process.env.FACEBOOK_CLIENT_SECRET)
        }
    },
        user:{
            additionalFields:{
                role: {
                    type: ["USER", "ADMIN"],
                    input: false
                }
            }
        },
    plugins: [nextCookies()]
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";