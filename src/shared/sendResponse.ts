import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
}
const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  const responseData: IResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
