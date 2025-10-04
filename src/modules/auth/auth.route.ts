import { Role } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middleware/checkAuth";
import validateRequest from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidation.login),
  AuthController.login
);

router.post(
  "/logout",
  checkAuth(...Object.values(Role)),
  AuthController.logout
);

router.patch(
  "/change-password",
  validateRequest(AuthValidation.changePassword),
  checkAuth(...Object.values(Role)),
  AuthController.changePassword
);

export const AuthRoutes = router;
