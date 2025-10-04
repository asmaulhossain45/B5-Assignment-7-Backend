import { Project } from "@prisma/client";
import { prisma } from "../../config/database";

const getAllProjects = async () => {
  const result = await prisma.project.findMany();
  return result;
};

const getSingleProject = async (slug: string) => {
  const result = await prisma.project.findUnique({ where: { slug } });
  return result;
};

const createProject = async (payload: Project) => {
  console.log(payload);
  const result = await prisma.project.create({ data: payload });
  return result;
};

const updateProject = async (slug: string, data: any) => {
  const result = await prisma.project.update({ where: { slug }, data });
  return result;
};

const updateProjectStatus = async (slug: string, data: any) => {
  const result = await prisma.project.update({ where: { slug }, data });
  return result;
};

const deleteProject = async (slug: string) => {
  const result = await prisma.project.delete({ where: { slug } });
  return result;
};

export const ProjectService = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
};
