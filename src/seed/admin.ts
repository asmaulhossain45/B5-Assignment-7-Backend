import { Role } from "@prisma/client";
import { prisma } from "../config/database";
import { envConfig } from "../config/envConfig";
import { hashPassword } from "../utils/bcrypt";

const seedAdmin = async () => {
  const name = envConfig.ADMIN.NAME;
  const email = envConfig.ADMIN.EMAIL;

  const password = await hashPassword(envConfig.ADMIN.PASSWORD);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      password,
      role: Role.ADMIN,
    },
  });

  console.info("✅ Admin created successfully!", admin);
};

seedAdmin();
