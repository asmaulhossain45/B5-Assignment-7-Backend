import { Request, Response } from "express";
import STATUS_CODE from "../../config/statusCode";
import { TFile } from "../../type/TFile";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogs();

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await BlogService.getSingleBlog(slug);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const uploadedFile = req.file as TFile;
  const result = await BlogService.createBlog(payload, uploadedFile);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const payload = req.body;
  const result = await BlogService.updateBlog(slug, payload);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const updateBlogStatus = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const payload = req.body;
  const result = await BlogService.updateBlogStatus(slug, payload);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Blog status updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await BlogService.deleteBlog(slug);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const BlogController = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  updateBlogStatus,
  deleteBlog,
};
