import { Schema, model } from "mongoose";
import { IAdmin, adminModel } from "./admin.interface";

const adminSchema = new Schema<IAdmin>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        require: true,
      },
    },
    address: {
      type: String,
      require: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IAdmin, adminModel>("admin", adminSchema);

export default User;
