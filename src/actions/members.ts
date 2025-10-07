"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const getAllMembers = async () => {
    const session = await auth()

    if(!session) return { status: 403, message: "Unauthenticated"}

    try {
        const members = await prisma.member.findMany({
            where: {
                gymId: session.user?.id
            }
        })

        if(!members || members.length === 0) {
            return {status: 401, message: "No members in the gym"}
        }

        return { status: 200, data: members}
    } catch (error) {
        return {status: 500, message: "Something went wrong", data: []}
    }
}