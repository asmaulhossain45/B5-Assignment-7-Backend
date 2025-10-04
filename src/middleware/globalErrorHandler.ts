import { NextFunction, Request, Response } from "express";

const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
