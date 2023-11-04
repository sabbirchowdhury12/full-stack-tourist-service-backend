import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { ReviewService } from "./review.service";

const insertToDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookingData = req.body;
    const result = await ReviewService.insertIntoDB(bookingData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ReviewService.getAllReview();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review Fetched  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const createRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingData = req.body;
    const result = await ReviewService.createRating(bookingData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Rating  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewController = {
  insertToDB,
  createRating,
  getAllReview,
};
