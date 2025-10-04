import { Request, Response } from "express";
import STATUS_CODE from "../../config/statusCode";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PublicService } from "./public.service";

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PublicService.getAllBlogs(query);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Blogs retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await PublicService.getSingleBlog(slug);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await PublicService.getAllProjects(query);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Projects retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await PublicService.getSingleProject(slug);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

export const PublicController = {
  getAllBlogs,
  getSingleBlog,
  getAllProjects,
  getSingleProject,
};
