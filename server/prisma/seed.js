// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("password", 10);
  await prisma.user.upsert({
    where: { email: "instructor@site.local" },
    update: {},
    create: {
      email: "instructor@site.local",
      password: hashed,
      role: "INSTRUCTOR",
      name: "Demo Instructor",
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
