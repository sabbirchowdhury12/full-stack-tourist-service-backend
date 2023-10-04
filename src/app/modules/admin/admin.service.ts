import ApiError from "../../../errors/ApiError";
import { IAdmin } from "./admin.interface";
import User from "./admin.model";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../../config";

const createAdmin = async (user: IAdmin): Promise<IAdmin> => {
  if (user?.password) {
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
  }

  const result = await User.create(user);

  if (!result) {
    throw new ApiError(400, "failed to  create a user");
  }
  const adminObject = result.toObject();
  delete adminObject.password;
  return adminObject;
};

const login = async (payload: { phoneNumber: string; password: string }) => {
  const { phoneNumber, password } = payload;

  const admin = await User.findOne({ phoneNumber });
  if (!admin) {
    throw new ApiError(404, "User not found");
  }

  if (!admin.password) {
    throw new Error("Admin password is missing");
  }

  const passwordValidation = await bcrypt.compare(password, admin.password);

  if (!passwordValidation) {
    throw new Error(" password is wrong");
  }

  const accessToken = jwt.sign(
    {
      id: admin._id,
      role: admin.role,
    },
    config.jwt_secret_key as Secret,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    {
      id: admin._id,
      role: admin.role,
    },
    config.jwt_refresh_key as Secret,
    { expiresIn: "365d" }
  );

  return { accessToken, refreshToken };
};

export const adminService = {
  createAdmin,
  login,
};
