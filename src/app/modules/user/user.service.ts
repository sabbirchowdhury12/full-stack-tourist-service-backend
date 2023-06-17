import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import User from "./user.model";

//create a user
const createUser = async (user: IUser): Promise<IUser> => {
  if (user?.role === "buyer") {
    user.income = 0;
  }
  if (user?.role === "seller") {
    user.budget = 0;
  }
  const createUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, "failed to  create a user");
  }
  return createUser;
};

//get all users
const getAllUser = async () => {
  const allUser = await User.find({});
  if (!allUser) {
    throw new ApiError(400, "failed to get all user");
  }
  return allUser;
};

//get a user
const getSingleUser = async (id: string) => {
  const getUser = await User.findById(id);
  if (!getUser) {
    throw new ApiError(400, "failed to get a user");
  }
  return getUser;
};

//delete a user
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(400, "failed to delete a user");
  }
  return result;
};

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
};
