import { prisma } from "../../config/database";
import STATUS_CODE from "../../config/statusCode";
import AppError from "../../utils/appError";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { AuthPayload, generateToken } from "../../utils/jwt";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(STATUS_CODE.NOT_FOUND, "User not found");
  }

  const isMatch = await comparePassword(payload.password, user.password);

  if (!isMatch) {
    throw new AppError(STATUS_CODE.UNAUTHORIZED, "Invalid password");
  }

  const authPayload: AuthPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = await generateToken(authPayload);

  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

const changePassword = async (
  payload: { oldPassword: string; newPassword: string },
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
    throw new AppError(STATUS_CODE.UNAUTHORIZED, "Invalid password");
  }

  const hashedPassword = await hashPassword(payload.newPassword);

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  return {
    updatedUser,
  };
};

export const AuthService = {
  login,
  changePassword,
};
