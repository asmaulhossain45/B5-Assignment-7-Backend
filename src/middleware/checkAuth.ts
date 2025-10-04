import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/database";
import STATUS_CODE from "../config/statusCode";
import AppError from "../utils/appError";
import { AuthPayload, verifyToken } from "../utils/jwt";

const checkAuth =
  (...allowedRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      let token;

      if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1].trim();
      }

      if (!token) {
        token = req.cookies?.token;
      }

      if (!token) {
        throw new AppError(
          STATUS_CODE.UNAUTHORIZED,
          "Please log in and try again."
        );
      }

      const decoded = verifyToken(token);

      if (!decoded) {
        throw new AppError(
          STATUS_CODE.UNAUTHORIZED,
          "Invalid access token. Please log in and try again."
        );
      }

      const { id } = decoded as AuthPayload;

      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        throw new AppError(
          STATUS_CODE.UNAUTHORIZED,
          "User not found. Please try again."
        );
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        throw new AppError(
          STATUS_CODE.UNAUTHORIZED,
          "You do not have permission"
        );
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };

export default checkAuth;
