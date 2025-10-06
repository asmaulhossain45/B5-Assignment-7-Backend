import bcrypt from "bcrypt";
import { envConfig } from "../config/envConfig";

const SALT_ROUNDS = envConfig.JWT.SALT_ROUND || 10;

export const hashPassword = (plain: string) => {
  return bcrypt.hash(plain, SALT_ROUNDS);
};

export const comparePassword = (plain: string, hashed: string) => {
  return bcrypt.compare(plain, hashed);
};
