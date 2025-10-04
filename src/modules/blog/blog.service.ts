import { Blog } from "@prisma/client";
import { prisma } from "../../config/database";
import STATUS_CODE from "../../config/statusCode";
import { TFile } from "../../type/TFile";
import AppError from "../../utils/appError";
import { generateSlug } from "../../utils/slugify";

const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany();
  return blogs;
};

const getSingleBlog = async (slug: string) => {
  const blog = await prisma.blog.findUnique({ where: { slug } });

  if (!blog) {
    throw new AppError(STATUS_CODE.NOT_FOUND, "Blog not found");
  }

  return blog;
};

const createBlog = async (payload: Blog, uploadedFile: TFile) => {
  const slug = await generateSlug("blog", "slug", payload.title);

  return slug;
};

const updateBlog = async (slug: string, payload: Blog) => {
  let updatedSlug = slug;

  if (payload.title) {
    updatedSlug = await generateSlug("blog", "slug", payload.title);
  }

  const blog = await prisma.blog.update({
    where: { slug },
    data: { ...payload, slug: updatedSlug },
  });

  return blog;
};

const updateBlogStatus = async (slug: string, payload: Blog) => {
  const blog = await prisma.blog.update({
    where: { slug },
    data: { status: payload.status },
  });

  return blog;
};

const deleteBlog = async (slug: string) => {
  const blog = await prisma.blog.delete({ where: { slug } });
  return blog;
};

export const BlogService = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  updateBlogStatus,
  deleteBlog,
};
