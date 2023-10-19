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

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.userLogin(email, password);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Login successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const result = await UserService.getAllUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const result = await UserService.getProfile(id, user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile get successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const userData = req.body;

    const result = await UserService.updateProfile(id, user, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const password = req.body;

    const result = await UserService.changePassword(id, password);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password Changed successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const makeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await UserService.makeAdmin(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Make admin successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  insertToDB,
  userLogin,
  getProfile,
  updateProfile,
  changePassword,
  getAllUser,
  makeAdmin,
};
