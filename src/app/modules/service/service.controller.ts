import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { ServicesService } from "./service.service";
import pick from "../../../shared/pick";

const getAllService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const filters = pick(req.query, ["minPrice", "maxPrice", "search"]);
    const result = await ServicesService.getAllService(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const insertIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const result = await ServicesService.insertIntoDB(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "service created successfully",
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
    const result = await ServicesService.getSingleFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "service created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAvailableService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { searchValue } = req.query;

    const result = await ServicesService.getAvailableService(searchValue);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Availeable service fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ServiceController = {
  getAllService,
  insertIntoDB,
  getSingleFromDB,
  getAvailableService,
};
