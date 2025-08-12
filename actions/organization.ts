"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { OrganizationServerSchema } from "@/schema/organization";
import { error } from "console";
import { redirect } from "next/navigation";
export async function createOrganization(formData: FormData) {

  const session = await auth();
  if(!session){
    redirect('/auth/signin')
  }
  
  const data = {
    name: formData.get("name"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  };
  const parsed = OrganizationServerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const createGym = await prisma.gym.create({
    data: {
      name: parsed.data.name,
      address: parsed.data.address,
      phone: parsed.data.phone,
      logo: parsed.data.logo ?? null,
      user: {
        connect: { id: "cme86canc0002hzyowl7ptpas"}
      },
    },
  });

  if(createGym){
      redirect("/dashboard")
  }
}
