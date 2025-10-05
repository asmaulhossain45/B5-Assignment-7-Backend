import { PostStatus } from "@prisma/client";
import { z } from "zod";

const createBlog = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(500, "Excerpt must be less than 500 characters"),
  content: z.string().min(1, "Content is required"),
  status: z.enum(PostStatus).default(PostStatus.DRAFT),
  category: z.string().min(1, "Category is required"),
});

const updateBlog = z.object({
  title: z.string().max(255).optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),
  status: z.enum(PostStatus).optional(),
  category: z.string().optional(),
});

const updateBlogStatus = z.object({
  status: z.enum(PostStatus),
});

export const BlogValidation = {
  createBlog,
  updateBlog,
  updateBlogStatus,
};
