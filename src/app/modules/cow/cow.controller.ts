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
      message: "Cows retrieved successfully",
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
    const cowId: string = req.params.id;
    const result = await CowService.getSingleCow(cowId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
//get a cow
const updateCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCow: {} = req.body;
    const cowId: string = req.params.id;
    const result = await CowService.updateCow(cowId, newCow);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//delete a cow
const deleteCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cowId: string = req.params.id;
    const result = await CowService.deleteCow(cowId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow deleted successfully",
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
  updateCow,
};
