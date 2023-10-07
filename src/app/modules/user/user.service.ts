import jwt, { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import config from "../../../config";

const insertIntoDB = async (data: User): Promise<Omit<User, "password">> => {
  const result = await prisma.user.create({
    data,
  });

  const { password, ...others } = result;
  return others;
};
const getAllFromDB = async (): Promise<Omit<User, "password">[]> => {
  const result = await prisma.user.findMany({});

  const usersWithoutPassword = result.map((user) => {
    const { password, ...others } = user;
    return others;
  });

  return usersWithoutPassword;
};
const getSingleFromDB = async (id: string): Promise<Omit<User, "password">> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }

  const { password, ...others } = result;
  return others;
};
const updateOneToDB = async (
  id: string,
  data: User
): Promise<Omit<User, "password">> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }

  const { password, ...others } = result;
  return others;
};

const deleteOneFromDB = async (id: string): Promise<Omit<User, "password">> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }

  const { password, ...others } = result;
  return others;
};
const userLogin = async (email: string, password: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!user.password) {
    throw new Error("user password is missing");
  }

  if (password != user.password) {
    throw new Error(" password is wrong");
  }

  const accessToken = jwt.sign(
    {
      role: user.role,
      userId: user.id,
    },
    config.jwt_secret_key as Secret,
    { expiresIn: "365d" }
  );

  return accessToken;
};
const getProfile = async (userInfo: any): Promise<User | null> => {
  const id = userInfo?.userId;
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const UserService = {
  insertIntoDB,
  userLogin,
  getAllFromDB,
  getSingleFromDB,
  updateOneToDB,
  deleteOneFromDB,
  getProfile,
};
