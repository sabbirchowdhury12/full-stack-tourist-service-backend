import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { FAQService } from "./faq.service";

const insertIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingData = req.body;
    const result = await FAQService.insertIntoDB(bookingData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "FAQ create  successfully",
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
    const result = await FAQService.getAllFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "FAQ fetched  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await FAQService.getSingleFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "FAQ fetched  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await FAQService.updateOne(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "FAQ updated  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await FAQService.deleteOne(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "FAQ deleted  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const FAQController = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateOne,
  deleteOne,
};
