import { Response } from "express";

export interface TMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
}

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: TMeta;
  data?: T;
}

const sendResponse = <T>(res: Response, response: TResponse<T>) => {
  const { statusCode, success, message, data, meta } = response;
  const payload: Record<string, any> = {
    success,
    message,
  };

  if (data !== undefined) payload.data = data;
  if (meta !== undefined) payload.meta = meta;

  return res.status(statusCode).json(payload);
};

export default sendResponse;
