import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { id: "default-user" },
    update: {},
    create: { id: "default-user", name: "Paty" },
  });
  console.log("Seeded default-user");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
