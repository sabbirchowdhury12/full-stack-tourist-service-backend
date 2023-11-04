import { ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../../interfaces/error";

import ApiError from "../../errors/ApiError";
import config from "../../config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    status: false,
    message,
    errorMessages,
    stack: config.node_env !== "production" ? error?.stack : "",
  });
};

export default globalErrorHandler;
