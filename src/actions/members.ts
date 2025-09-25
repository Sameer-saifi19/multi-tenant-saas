import { auth } from "@/auth"
import { prisma } from "@/lib/prisma";

export const getAllMembers = async () => {
    try {
        const session = await auth();

        if(!session) return { status: 404, message: "Unauthenticated"}

        const members = await prisma.
    } catch (error) {
        
    }
}