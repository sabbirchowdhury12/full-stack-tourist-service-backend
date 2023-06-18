import { Schema, model } from "mongoose";
import { IOrder, orderModel } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  cow: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Order = model<IOrder, orderModel>("Orders", orderSchema);

export default Order;
