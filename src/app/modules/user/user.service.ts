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
    throw new ApiError(400, "failed to create");
  }
  return createUser;
};

export const UserService = {
  createUser,
};
