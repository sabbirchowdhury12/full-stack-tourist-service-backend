import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { CowService } from "./cow.service";

//create a cow
const createCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cow } = req.body;
    const result = await CowService.createCow(cow);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "cow created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//get all cow
const getAllCows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CowService.getAllCows();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//get a cow
const getSingleCow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.id;
    const result = await CowService.getSingleCow(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//delete a cow
const deleteCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const result = await CowService.deleteCow(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  deleteCow,
};
