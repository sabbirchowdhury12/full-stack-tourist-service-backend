import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cow, buyer } = req.body;

    const result = await OrderService.createOrder({ cow, buyer });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "order done",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderService.getAllOrder();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
};
