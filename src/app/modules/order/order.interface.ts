import { Model, Schema } from "mongoose";

export interface IOrder {
  cow: Schema.Types.ObjectId;
  buyer: Schema.Types.ObjectId;
}

export type orderModel = Model<IOrder>;
