'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { OrganizationServerSchema } from "@/schema/organization";
export async function createOrganization(data: {
  name: string;
  address: string;
  phone: string;
  logo?: string | undefined;
}) {

    const session = await auth();

    if(!session?.user?.id){
        throw new Error("Unauthorized")
    }
  const parsed = OrganizationServerSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, address, phone, logo } = parsed.data;

  try {
    const organization = await prisma.gym.create({
      data: { name, address, phone, logo, user: { connect: {id: session.user.id}}},
    });

    return {
      success: true,
      data: organization,
    };
  } catch (error) {
    console.error("Failed to create organization:", error);
    return {
      success: false,
      message: "Something went wrong while creating the organization.",
    };
  }
}
