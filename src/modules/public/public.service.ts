import { PostStatus } from "@prisma/client";
import { prisma } from "../../config/database";
import STATUS_CODE from "../../config/statusCode";
import AppError from "../../utils/appError";

const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    where: { status: PostStatus.PUBLISHED },
    orderBy: { createdAt: "desc" },
  });

  return blogs;
};

const getSingleBlog = async (slug: string) => {
  const result = await prisma.blog.findUnique({ where: { slug } });

  if (!result) {
    throw new AppError(STATUS_CODE.NOT_FOUND, "Blog not found");
  }

  return result;
};

const getAllProjects = async () => {
  return await prisma.project.findMany({
    where: { status: PostStatus.PUBLISHED },
    orderBy: { createdAt: "desc" },
  });
};

const getSingleProject = async (slug: string) => {
  const result = await prisma.project.findUnique({ where: { slug } });

  if (!result) {
    throw new AppError(STATUS_CODE.NOT_FOUND, "Project not found");
  }

  return result;
};

export const PublicService = {
  getAllBlogs,
  getSingleBlog,
  getAllProjects,
  getSingleProject,
};
