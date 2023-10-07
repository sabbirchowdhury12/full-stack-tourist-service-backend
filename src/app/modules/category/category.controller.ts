import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";

const insertToDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const result = await CategoryService.insertIntoDB(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category  created successfully",
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
    const result = await CategoryService.getAllFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Categories  fetched  successfully",
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
    const result = await CategoryService.getSingleFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateOneToDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await CategoryService.updateOneToDB(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category  updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOneFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await CategoryService.deleteOneFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  insertToDB,
  getAllFromDB,
  getSingleFromDB,
  updateOneToDB,
  deleteOneFromDB,
};
