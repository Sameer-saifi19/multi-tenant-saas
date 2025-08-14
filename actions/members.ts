"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function createMember(formData: FormData) {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const gym = await prisma.gym.findFirst({
    where: { userId: session?.user?.id },
    select: { id: true },
  });

  if (!gym) throw new Error("gym not found ");

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const gender = formData.get("gender") as "MALE" | "FEMALE" | "OTHER" | null;
  const dateOfBirth = formData.get("dateOfBirth")
    ? new Date(formData.get("dateOfBirth") as string)
    : null;
  const membershipStatus = formData.get("status") as
    | "ACTIVE"
    | "INACTIVE"
    | "EXPIRED"
    | null;
  const membershipStart = formData.get("membershipStart")
    ? new Date(formData.get("membershipStart") as string)
    : null;
  const membershipEnd = formData.get("membershipEnd")
    ? new Date(formData.get("membershipEnd") as string)
    : null;
  const status = formData.get("status") as "ACTIVE" | "INACTIVE" | "EXPIRED";
  const notes = formData.get("notes") as string | null;
  const gymId = gym.id;

  await prisma.member.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      membershipStart,
      membershipEnd,
      status,
      notes,
      gymId,
    },
  });
}
