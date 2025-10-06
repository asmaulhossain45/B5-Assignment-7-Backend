import { prisma } from "../../config/database";
import STATUS_CODE from "../../config/statusCode";
import AppError from "../../utils/appError";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { AuthPayload, generateToken } from "../../utils/jwt";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

const login = async (payload: LoginPayload) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(STATUS_CODE.UNAUTHORIZED, "Invalid email or password");
  }

  const isMatch = await comparePassword(payload.password, user.password);

  if (!isMatch) {
    throw new AppError(STATUS_CODE.UNAUTHORIZED, "Invalid email or password");
  }

  const authPayload: AuthPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = generateToken(authPayload);

  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

const changePassword = async (
  payload: ChangePasswordPayload,
  user: AuthPayload
) => {
  const userExists = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!userExists) {
    throw new AppError(STATUS_CODE.NOT_FOUND, "User not found");
  }

  const isMatch = await comparePassword(
    payload.oldPassword,
    userExists.password
  );

  if (!isMatch) {
    throw new AppError(STATUS_CODE.UNAUTHORIZED, "Invalid old password");
  }

  const isSamePassword = await comparePassword(
    payload.newPassword,
    userExists.password
  );
  if (isSamePassword)
    throw new AppError(
      STATUS_CODE.BAD_REQUEST,
      "New password cannot be the same as the old password"
    );

  const hashedPassword = await hashPassword(payload.newPassword);

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  const { password, ...userWithoutPassword } = updatedUser;

  return {
    user: userWithoutPassword,
  };
};

export const AuthService = {
  login,
  changePassword,
};
