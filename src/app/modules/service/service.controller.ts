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
    const filters = pick(req.query, ["search", "minPrice", "maxPrice"]);
    const result = await ServicesService.getAllService(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service fetched successfully",
      meta: result.meta,
      data: result.data,
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
const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const serviceData = req.body;
    const result = await ServicesService.updateService(id, serviceData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "service updated successfully",
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
const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await ServicesService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "service deleted successfully",
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
  updateService,
  deleteFromDB,
};
