import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
  data: T | null;
}
const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  const responseData: IResponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta || null,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
