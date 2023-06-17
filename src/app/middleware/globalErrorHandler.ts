import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorMessages: IGenericErrorMessage[] = [];
  console.log(error.errors.name);
  console.log(error);
  if (error?.name === "validationError") {
    const finalError = handleValidationError(error);
  }

  res.status(statusCode).json({
    status: false,
    message,
    errorMessages,
  });
  next();
};

export default globalErrorHandler;
