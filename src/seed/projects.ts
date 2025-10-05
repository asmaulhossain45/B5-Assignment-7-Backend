import { PostStatus } from "@prisma/client";
import { prisma } from "../config/database";
import { projectData } from "../constants/projectData";

const projectsSeed = async () => {
  console.log("⚙️ Seeding projects...");
  try {
    const projectss = projectData.map((project) => ({
      ...project,
      status:
        project.status === "PUBLISHED"
          ? PostStatus.PUBLISHED
          : PostStatus.DRAFT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await prisma.project.createMany({
      data: projectss,
      skipDuplicates: true,
    });

    console.log("✅ Projects seeded successfully!");
  } catch (error) {
    console.log("❌ Projects seed failed!", error);
  } finally {
    await prisma.$disconnect();
  }
};

projectsSeed();
