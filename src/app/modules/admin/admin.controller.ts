import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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

export const adminController = {
  createAdmin,
};
