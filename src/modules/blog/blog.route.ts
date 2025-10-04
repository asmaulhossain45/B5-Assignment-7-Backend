import { Role } from "@prisma/client";
import { Router } from "express";
import { multerUpload } from "../../config/multer";
import checkAuth from "../../middleware/checkAuth";
import validateRequest from "../../middleware/validateRequest";
import { BlogController } from "./blog.controller";
import { BlogValidation } from "./blog.validation";

const router = Router();

router.get("/", checkAuth(Role.ADMIN), BlogController.getAllBlogs);

router.get("/:slug", checkAuth(Role.ADMIN), BlogController.getSingleBlog);

router.post("/", multerUpload.single("thumb"), BlogController.createBlog);

router.patch(
  "/:slug",
  validateRequest(BlogValidation.updateBlog),
  checkAuth(Role.ADMIN),
  BlogController.updateBlog
);

router.patch(
  "/:slug/status",
  validateRequest(BlogValidation.updateBlogStatus),
  checkAuth(Role.ADMIN),
  BlogController.updateBlogStatus
);

router.delete("/:slug", checkAuth(Role.ADMIN), BlogController.deleteBlog);

export const BlogRoutes = router;
