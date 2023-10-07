import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";

const insertToDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const result = await BookService.insertIntoDB(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book  created successfully",
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
    const filters = pick(req.query, [
      "search",
      "minPrice",
      "maxPrice",
      "category",
    ]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await BookService.getAllFromDB(options, filters);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books  fetched  successfully",
      meta: result.meta,
      data: result.data,
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
    const result = await BookService.getSingleFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book fetched successfully",
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
    const result = await BookService.updateOneToDB(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book  updated successfully",
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
    const result = await BookService.deleteOneFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await BookService.getSingleByCategory(id, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books with associated category data fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  insertToDB,
  getAllFromDB,
  getSingleFromDB,
  updateOneToDB,
  deleteOneFromDB,
  getSingleByCategory,
};
