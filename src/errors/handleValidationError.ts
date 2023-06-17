import mongoose from "mongoose";
import { IGenericErrorResponse } from "../interfaces/errorResponse";
import httpStatus from "http-status";
import { IGenericErrorMessage } from "../interfaces/error";

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  console.log(error);
  const errors = Object.values(error.errors).map((err) => err.message);

  const statusCode = httpStatus.UNPROCESSABLE_ENTITY;
  //   return {
  //     statusCode,
  //     message: "Validation Error",
  //     errorMessages: errors,
  //   };
};

export default handleValidationError;
