import { Role } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middleware/checkAuth";
import validateRequest from "../../middleware/validateRequest";
import { ProjectController } from "./project.controller";
import { ProjectValidation } from "./project.validation";

const router = Router();

router.get("/", checkAuth(Role.ADMIN), ProjectController.getAllProject);

router.get("/:slug", checkAuth(Role.ADMIN), ProjectController.getSingleProject);

router.post(
  "/",
  // validateRequest(ProjectValidation.createProject),
  // checkAuth(Role.ADMIN),
  ProjectController.createProject
);

router.patch(
  "/:slug",
  validateRequest(ProjectValidation.updateProject),
  checkAuth(Role.ADMIN),
  ProjectController.updateProject
);

router.patch(
  "/:slug/status",
  validateRequest(ProjectValidation.updateProjectStatus),
  checkAuth(Role.ADMIN),
  ProjectController.updatedProjectStatus
);

router.delete("/:slug", checkAuth(Role.ADMIN), ProjectController.deleteProject);

export const ProjectRoutes = router;
