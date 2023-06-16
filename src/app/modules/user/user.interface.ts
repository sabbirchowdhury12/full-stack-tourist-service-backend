import { Model } from "mongoose";

export type IUser = {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  address: string;
  budget?: number;
  income?: number;
};

export type userModel = Model<IUser>;
