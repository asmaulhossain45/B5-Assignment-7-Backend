import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { envConfig } from "../config/envConfig";
import AppError from "../utils/appError";

const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errors: any = undefined;

  // Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.issues.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  }

  // Prisma known errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        const fields = (err.meta?.target as string[])?.join(", ") || "field(s)";
        message = `Unique constraint failed on ${fields}`;
        break;
      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;
      default:
        statusCode = 400;
        message = `Prisma error: ${err.code}`;
    }
  }

  // Prisma validation errors
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data passed to Prisma";
  }

  // Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Other errors
  else if (err.message) {
    message = err.message;
  }

  const response: any = {
    success: false,
    message,
  };

  if (errors) response.errors = errors;
  if (envConfig.NODE_ENV === "development") response.stack = err.stack;

  res.status(statusCode).json(response);
};

export default globalErrorHandler;
