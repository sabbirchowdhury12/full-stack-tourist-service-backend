import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "ValidationError") {
    const finalError = handleValidationError(error);
    statusCode = finalError?.statusCode;
    message = finalError?.message;
    errorMessages = finalError?.errorMessages;
  }

  res.status(statusCode).json({
    status: false,
    message,
    errorMessages,
  });
  next();
};

export default globalErrorHandler;
