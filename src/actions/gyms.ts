import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const verifyAccessToGyms = async (gymId: string) => {
  try {
    const session = await auth();

    if (!session) {
      return { status: 403 };
    }

    const isUserInGym = await prisma.gym.findUnique({
      where: {
        id: gymId,
        OR: [
          {
            id: session.user?.id,
          },
        ],
      },
    });

    return {
      status: 200,
      data: {
        gym: isUserInGym,
      },
    };
  } catch (error) {
    return {
      status: 403,
      data: {
        gym: null,
      },
    };
  }
};
