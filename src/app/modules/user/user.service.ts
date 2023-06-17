import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import User from "./user.model";

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

const getAllUser = async () => {
  const allUser = await User.find({});
  if (!allUser) {
    throw new ApiError(400, "failed to get all user");
  }
  return allUser;
};

const getSingleUser = async (id: string) => {
  const getUser = await User.findById(id);
  if (!getUser) {
    throw new ApiError(400, "failed to get a user");
  }
  return getUser;
};

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
};
