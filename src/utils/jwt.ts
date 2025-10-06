import { Role } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import STATUS_CODE from "../config/statusCode";
import AppError from "./appError";

export interface AuthPayload {
  id: number;
  email: string;
  role: Role;
}

const JWT_SECRET = envConfig.JWT.SECRET;
const JWT_EXPIRES_IN = envConfig.JWT.EXPIRES_IN || "1d";

export const generateToken = (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const verifyToken = (token: string): AuthPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      throw new AppError(STATUS_CODE.UNAUTHORIZED, "Invalid token");
    }

    return decoded as AuthPayload;
  } catch (error) {
    throw new AppError(STATUS_CODE.UNAUTHORIZED, "Invalid or expired token");
  }
};
