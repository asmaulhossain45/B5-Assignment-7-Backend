import { prisma } from "../../config/database";
import STATUS_CODE from "../../config/statusCode";
import AppError from "../../utils/appError";
import { queryBuilder } from "../../utils/queryBuilder";

const getAllBlogs = async (query: any) => {
  const searchFields = ["title", "excerpt", "content"];

  const result = await queryBuilder({
    model: prisma.blog,
    query,
    searchFields,
  });

  return result;
};

const getSingleBlog = async (slug: string) => {
  const result = await prisma.blog.findUnique({ where: { slug } });

  if (!result) {
    throw new AppError(STATUS_CODE.NOT_FOUND, "Blog not found");
  }

  return result;
};

const getAllProjects = async (query: any) => {
  const searchFields = ["title", "excerpt", "content"];

  const result = await queryBuilder({
    model: prisma.project,
    query,
    searchFields,
    select: {
      slug: true,
      content: true,
    },
  });

  return result;
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
