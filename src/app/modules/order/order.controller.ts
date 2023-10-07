import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { OrderService } from "./order.service";

const insertToDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderedBooks } = req.body;
    const userInfo = req.user;
    const result = await OrderService.insertIntoDB(orderedBooks, userInfo);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order  created successfully",
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
    const userInfo = req.user;
    const result = await OrderService.getAllFromDB(userInfo);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "orders  fetched  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
//   const getSingleFromDB = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const id = req.params.id;
//       const result = await BookService.getSingleFromDB(id);

//       sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Book fetched successfully",
//         data: result,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };

export const OrderController = {
  insertToDB,
  getAllFromDB,
};
