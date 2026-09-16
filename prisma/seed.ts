import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";



async function main() {
  const email = "user@2k78kosh.com";
  const password = "user23";

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      name: "Member",
      password: hashedPassword,
      role: "USER",
    },
  });

  console.log("User created:");
  console.log({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });