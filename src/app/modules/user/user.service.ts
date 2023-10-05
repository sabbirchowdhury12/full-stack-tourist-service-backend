import jwt, { Secret, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import User from "./user.model";
import config from "../../../config";
import httpStatus from "http-status";

//create a user
const createUser = async (user: IUser): Promise<IUser> => {
  if (user?.role === "buyer") {
    user.income = 0;
  }
  if (user?.role === "seller") {
    user.budget = 0;
  }

  if (user?.password) {
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
  }

  const createUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, "failed to  create a user");
  }
  return createUser;
};

//get all users
const getAllUser = async (): Promise<IUser[]> => {
  const allUser = await User.find({});
  if (!allUser) {
    throw new ApiError(400, "failed to get all user");
  }
  return allUser;
};

//get a user
const getSingleUser = async (id: string): Promise<IUser> => {
  const getUser = await User.findById(id, {}, { new: true });
  if (!getUser) {
    throw new ApiError(400, "failed to get a user");
  }
  return getUser;
};

//update a user
const updateUser = async (id: string, newUser: {}): Promise<IUser> => {
  const result = await User.findByIdAndUpdate(
    id,
    { ...newUser },
    { new: true }
  );
  if (!result) {
    throw new ApiError(400, "failed to update a user");
  }
  return result;
};

//delete a user
const deleteUser = async (id: string): Promise<IUser> => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(400, "failed to delete a user");
  }
  return result;
};

const login = async (payload: { phoneNumber: string; password: string }) => {
  const { phoneNumber, password } = payload;

  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.password) {
    throw new Error("user password is missing");
  }

  const passwordValidation = await bcrypt.compare(password, user.password);

  if (!passwordValidation) {
    throw new Error(" password is wrong");
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.jwt_secret_key as Secret,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.jwt_refresh_key as Secret,
    { expiresIn: "365d" }
  );

  return { accessToken, refreshToken };
};

interface JwtPayload {
  id: string;
  role: string;
}

const refreshToken = async (token: string) => {
  let verifiedToken: JwtPayload | null = null; // Use the JwtPayload interface

  try {
    const decodedToken = jwt.verify(token, config.jwt_refresh_key as Secret);
    if (typeof decodedToken === "object") {
      verifiedToken = decodedToken as JwtPayload;
    }
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  if (!verifiedToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  const { id } = verifiedToken;

  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doed not exist");
  }

  const newAccessToken = jwt.sign(
    {
      id: isUserExist?._id,
      role: isUserExist?.role,
    },
    config.jwt_secret_key as Secret,
    { expiresIn: "365d" }
  );

  return {
    accessToken: newAccessToken,
  };
};
export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  login,
  refreshToken,
};
