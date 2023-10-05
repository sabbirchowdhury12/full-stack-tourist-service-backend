import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { CowService } from "./cow.service";
import pick from "../../../shared/pick";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import { AuthorizedUser } from "../../../interfaces/user";

//create a cow
const createCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cow = req.body;
    const user = req.user;
    let id;
    if (user) {
      id = user.id;
    }

    const result = await CowService.createCow(cow, id);

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
    const filters = req.query;

    const paginationOptions = pick(req.query, [
      "page",
      "limit",
      "sortBy",
      "sortOrder",
    ]);

    const result = await CowService.getAllCows(filters, paginationOptions);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cows retrieved successfully",
      meta: result.meta,
      data: result.data,
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
    const user = req.user;
    let id;
    if (user) {
      id = user.id;
    }
    const result = await CowService.updateCow(cowId, newCow, id);

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
    const user = req.user;
    let id;
    if (user) {
      id = user.id;
    }
    const result = await CowService.deleteCow(cowId, id);

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
