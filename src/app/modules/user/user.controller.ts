import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";

const insertToDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const result = await UserService.insertIntoDB(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users created successfully",
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
    const result = await UserService.getAllFromDB();

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
const getSingleFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await UserService.getSingleFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched successfully",
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
    const result = await UserService.updateOneToDB(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully",
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
    const result = await UserService.deleteOneFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Uers deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.userLogin(email, password);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User signin successfully!",
      data: { token: result },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInfo = req.user;
    const result = await UserService.getProfile(userInfo);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  insertToDB,
  getAllFromDB,
  userLogin,
  getSingleFromDB,
  updateOneToDB,
  deleteOneFromDB,
  getProfile,
};
