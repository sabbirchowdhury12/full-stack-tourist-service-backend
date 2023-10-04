import { Model } from "mongoose";

export type IAdmin = {
  phoneNumber: string;
  role: "admin";
  password?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget?: number;
  income?: number;
};

export type adminModel = Model<IAdmin>;
