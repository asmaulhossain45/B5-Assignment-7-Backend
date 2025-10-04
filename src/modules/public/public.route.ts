import { Router } from "express";
import { PublicController } from "./public.controller";

const router = Router();

router.get("/blogs", PublicController.getAllBlogs);

router.get("/blogs/:slug", PublicController.getSingleBlog);

router.get("/projects", PublicController.getAllProjects);

router.get("/projects/:slug", PublicController.getSingleProject);

export const PublicRoutes = router;
