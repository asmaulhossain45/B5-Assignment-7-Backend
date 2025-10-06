import { Request, Response } from "express";
import STATUS_CODE from "../../config/statusCode";
import catchAsync from "../../utils/catchAsync";
import { AuthPayload } from "../../utils/jwt";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.login(payload);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24,
  });

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Login successfully",
    data: {
      user: result.user,
      token: result.token,
    },
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Logout successfully",
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user as AuthPayload;
  const result = await AuthService.changePassword(payload, user);

  sendResponse(res, {
    statusCode: STATUS_CODE.OK,
    success: true,
    message: "Password changed successfully",
    data: result.user,
  });
});

export const AuthController = {
  login,
  logout,
  changePassword,
};
