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

// const getAllOrder = async (userInfo: any): Promise<IOrder[] | null> => {
//   if (userInfo?.role == "buyer" && userInfo?.role == "seller") {
//     const orders = await Order.find({ buyer: userInfo.id });
//     console.log(orders);
//     return orders;
//   } else {
//     return null;
//   }
// };

const getAllOrder = async (userInfo: any) => {
  const orders = await Order.find({});

  if (userInfo?.role == "buyer") {
    const orders = await Order.find({ buyer: userInfo.id });
    console.log(orders);
    return orders;
  } else if (userInfo?.role == "seller") {
    const filteredOrders = await Promise.all(
      orders.map(async (order) => {
        const cow = await Cow.findById(order.cow);
        if (cow && cow.seller == userInfo.id) {
          return order;
        }
        return null; // Return null for orders that don't match the criteria
      })
    );

    // Remove null values from the filteredOrders array
    const validOrders = filteredOrders.filter((order) => order !== null);

    return validOrders;
  } else if (userInfo?.role == "admin") {
    return orders;
  } else {
    return null;
  }
};

const getSingleOrder = async (id: string, user: any) => {
  console.log(user);
  const order = await Order.findById(id);
  if (!order) {
    throw new ApiError(400, "failed to get a cow");
  }

  if (user.role == "buyer" && order?.buyer != user.id) {
    throw new ApiError(400, "you can not access");
  }

  const cow = await Cow.findById(order?.cow);

  if (user.role == "seller" && cow?.seller != user.id) {
    throw new ApiError(400, "you can not access");
  }

  const seller = await User.findById(cow?.seller);
  console.log(seller);
  const buyer = await User.findById(order?.buyer);

  return { cow, seller, buyer };
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
