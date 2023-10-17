import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { BookingService } from "./booking.service";

const insertToDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookingData = req.body;

    const result = await BookingService.insertIntoDB(bookingData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service  booked successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const { statusValue } = req.query;

    const result = await BookingService.getAllFromDB(user, statusValue);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking Data fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const result = await BookingService.cancelBooking(id, user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cancel booking successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookingController = {
  insertToDB,
  getAllFromDB,
  cancelBooking,
};
