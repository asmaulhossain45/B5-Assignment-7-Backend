import { PostStatus } from "@prisma/client";
import { z } from "zod";

const createProject = z.object({});

const updateProject = z.object({});

const updateProjectStatus = z.object({
  status: z.enum(Object.values(PostStatus)),
});

export const ProjectValidation = {
  createProject,
  updateProject,
  updateProjectStatus,
};
