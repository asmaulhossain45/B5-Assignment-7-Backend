import { Role } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";
import { envConfig } from "../config/envConfig";

export interface AuthPayload {
  id: number;
  email: string;
  role: Role;
}

export const generateToken = (payload: AuthPayload) => {
  return jwt.sign(payload, envConfig.JWT.SECRET, {
    expiresIn: envConfig.JWT.EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, envConfig.JWT.SECRET);
};
