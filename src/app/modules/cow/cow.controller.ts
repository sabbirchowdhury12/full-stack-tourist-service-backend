import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { CowService } from "./cow.service";

const createCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cow } = req.body;
    const result = await CowService.createCow(cow);

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

export const CowController = {
  createCow,
};
