import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { ProjectRoutes } from "../modules/project/project.route";
import { PublicRoutes } from "../modules/public/public.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/project", ProjectRoutes);
router.use("/blog", BlogRoutes);
router.use("/public", PublicRoutes);

export default router;
