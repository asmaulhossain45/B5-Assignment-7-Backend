import { z } from "zod";

const login = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, "Invalid credentials"),
});

const changePassword = z.object({
  oldPassword: z.string().min(8, "Invalid old password"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export const AuthValidation = {
  login,
  changePassword,
};
