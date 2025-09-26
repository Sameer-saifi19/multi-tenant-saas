import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getAllMembers = async (gymId: string) => {
  try {
    const session = await auth();

    if (!session) return { status: 404, message: "Unauthenticated" };

    const members = await prisma.member.findMany({
      where: {
        gymId,
      },
    });

    if (!members || members.length === 0)
      return { status: 403, message: "You don't have any members yet." };

    if (members && members.length > 0) {
      return { status: 200, data: members };
    }

    return { status: 404, data: [] };
  } catch (error) {
    return { status: 400, data: [] };
  }
};
