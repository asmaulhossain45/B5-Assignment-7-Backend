import { Request, Response } from "express";
import STATUS_CODE from "../../config/statusCode";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";

const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects();

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result,
    meta: {
      page: 1,
      limit: 10,
      total: result.length,
      totalPage: 1,
    },
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await ProjectService.getSingleProject(slug);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

const createProject = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ProjectService.createProject(payload);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const payload = req.body;
  const result = await ProjectService.updateProject(slug, payload);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const updatedProjectStatus = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const payload = req.body;
  const result = await ProjectService.updateProjectStatus(slug, payload);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Project status updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await ProjectService.deleteProject(slug);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectController = {
  getAllProject,
  getSingleProject,
  createProject,
  updateProject,
  updatedProjectStatus,
  deleteProject,
};
