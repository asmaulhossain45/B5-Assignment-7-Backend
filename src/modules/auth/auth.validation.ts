import { z } from "zod";

const login = z.object({
  email: z.email(),
  password: z.string(),
});

const changePassword = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8),
});

export const AuthValidation = {
  login,
  changePassword,
};
