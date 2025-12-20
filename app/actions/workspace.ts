import prisma from "@/lib/prisma";
import { checkAuth } from "./user";

export const getWorkspaces = async () => {
  const auth = await checkAuth();

  if (!auth) return { status: 404, message: "Unauthenticated" };

  try {
    const workspaces = await prisma.user.findUnique({
      where: {
        id: auth.session?.user.id,
      },
      select: {
        workspaces: true,
        members: true,
        subsription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (workspaces)
      return {
        status: 200,
        data: workspaces,
      };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
};

