import bcrypt from "bcrypt";
import { envConfig } from "../config/envConfig";

export const hashPassword = async (plain: string) => {
  return await bcrypt.hash(plain, envConfig.JWT.SALT_ROUND);
};

export const comparePassword = async (plain: string, hashed: string) => {
  return await bcrypt.compare(plain, hashed);
};
