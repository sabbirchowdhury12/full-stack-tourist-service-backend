import ApiError from "../../../errors/ApiError";
import { IAdmin } from "./admin.interface";
import User from "./admin.model";

const createAdmin = async (user: IAdmin): Promise<IAdmin> => {
  const result = await User.create(user);
  if (!result) {
    throw new ApiError(400, "failed to  create a user");
  }
  const adminObject = result.toObject();
  delete adminObject.password;
  console.log(adminObject);
  return adminObject;
};

export const adminService = {
  createAdmin,
};
