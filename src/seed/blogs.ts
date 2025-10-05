import { PostStatus } from "@prisma/client";
import { prisma } from "../config/database";
import { blogData } from "../constants/blogData";

const blogSeed = async () => {
  console.log("⚙️ Seeding blog...");
  try {
    const blogs = blogData.map((blog) => ({
      ...blog,
      status:
        blog.status === "PUBLISHED" ? PostStatus.PUBLISHED : PostStatus.DRAFT,
      publishedAt: blog.publishedAt ? new Date(blog.publishedAt) : null,
      updatedAt: new Date(blog.updatedAt),
      createdAt: new Date(blog.createdAt),
    }));

    await prisma.blog.createMany({
      data: blogs,
      skipDuplicates: true,
    });

    console.log("✅ Blog seeded successfully!");
  } catch (error) {
    console.log("❌ Blog seed failed!", error);
  } finally {
    await prisma.$disconnect();
  }
};

blogSeed();
