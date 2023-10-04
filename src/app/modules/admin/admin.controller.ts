import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    const result = await adminService.createAdmin(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    const result = await adminService.login(user);

    /// set refresh token in cookie
    const cookieOptions = {
      secure: config.node_env === "production",
      httpOnly: true,
    };
    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully",
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const adminController = {
  createAdmin,
  login,
};
