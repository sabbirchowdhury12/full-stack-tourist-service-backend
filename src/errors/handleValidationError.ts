import mongoose, { Error as MongooseError } from "mongoose";
import { IGenericErrorResponse } from "../interfaces/errorResponse";
import httpStatus from "http-status";
import { IGenericErrorMessage } from "../interfaces/error";

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: err?.path,
        message: err?.message,
      };
    }
  );
  const statusCode = httpStatus.UNPROCESSABLE_ENTITY;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
