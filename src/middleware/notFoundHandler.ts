import { Request, Response } from "express";
import STATUS_CODE from "../config/statusCode";

const notFoundHandler = (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_FOUND).json({
    success: false,
    message: "Route not found",
  });
};

export default notFoundHandler;
