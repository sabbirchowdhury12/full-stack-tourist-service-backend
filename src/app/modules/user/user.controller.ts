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
      message: "User signin successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  insertToDB,
  userLogin,
};
