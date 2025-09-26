import { PrismaClient, PaymentStatus, MemberStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Create a user (Admin)
  const user = await prisma.user.create({
    data: {
      name: "John Admin",
      email: "admin@example.com",
      emailVerified: new Date(),
      password: "hashedpassword123", // ideally hash using bcrypt
      image: "https://i.pravatar.cc/150?img=1",
    },
  });

  // 2️⃣ Create a Gym
  const gym = await prisma.gym.create({
    data: {
      name: "SuperFit Gym",
      address: "123 Fitness Street",
      logoUrl: "https://via.placeholder.com/150",
      ownerId: user.id,
    },
  });

  // 3️⃣ Create a Member
  const member = await prisma.member.create({
    data: {
      name: "Jane Doe",
      email: "jane@example.com",
      profileImage: "https://i.pravatar.cc/150?img=2",
      phone: "1234567890",
      gymId: gym.id,
      status: MemberStatus.ACTIVE,
    },
  });

  // 4️⃣ Create a Payment
  await prisma.payment.create({
    data: {
      amount: 1999.99,
      status: PaymentStatus.SUCCESS,
      memberId: member.id,
      gymId: gym.id,
      paymentId: "pay_1234567890",
    },
  });

  console.log("✅ Seed data created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
