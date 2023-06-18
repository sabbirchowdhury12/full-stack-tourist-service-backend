import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import User from "../user/user.model";
import { IOrder } from "./order.interface";
import Cow from "../cow/cow.model";
import mongoose from "mongoose";
import Order from "./order.model";

const createOrder = async ({ cow, buyer }: IOrder): Promise<IOrder> => {
  const Buyer = await User.findById(buyer);

  if (!(Buyer?.role === "buyer")) {
    throw new ApiError(httpStatus.NOT_FOUND, "buyer not found");
  }
  const selectedCow = await Cow.findById(cow);

  if (!(selectedCow?.label === "for sale")) {
    throw new ApiError(httpStatus.NOT_FOUND, "cow not found");
  }
  console.log(cow, selectedCow, Buyer);
  const cowCost = selectedCow?.price;
  const buyerBudget = Buyer?.budget || 0;
  if (buyerBudget < cowCost) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not Enough Budget");
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await Cow.findByIdAndUpdate(cow, { label: "sold out" });
    await User.findByIdAndUpdate(buyer, { $inc: { budget: -cowCost } });

    const result = await Order.create({ cow, buyer });

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const OrderService = {
  createOrder,
};
