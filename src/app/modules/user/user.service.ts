import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import config from "../../../config";
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (data: User) => {
  if (data?.password) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
  }
  const result = await prisma.user.create({
    data,
  });

  const accessToken = jwt.sign(
    {
      role: result.role,
      id: result.id,
    },
    config.jwt_secret_key as Secret,
    { expiresIn: "365d" }
  );

  const { password, ...others } = result;

  return { user: others, accessToken };
};
// const getAllFromDB = async (): Promise<Omit<User, "password">[]> => {
//   const result = await prisma.user.findMany({});

//   const usersWithoutPassword = result.map((user) => {
//     const { password, ...others } = user;
//     return others;
//   });

//   return usersWithoutPassword;
// // };
// const getSingleFromDB = async (id: string): Promise<Omit<User, "password">> => {
//   const result = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, "user not found");
//   }

//   const { password, ...others } = result;
//   return others;
// };
// const updateOneToDB = async (
//   id: string,
//   data: User
// ): Promise<Omit<User, "password">> => {
//   const result = await prisma.user.update({
//     where: {
//       id,
//     },
//     data,
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, "user not found");
//   }

//   const { password, ...others } = result;
//   return others;
// };

// const deleteOneFromDB = async (id: string): Promise<Omit<User, "password">> => {
//   const result = await prisma.user.delete({
//     where: {
//       id,
//     },
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, "user not found");
//   }

//   const { password, ...others } = result;
//   return others;
// };
const userLogin = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const passwordValidation = await bcrypt.compare(password, user.password);

  if (!passwordValidation) {
    throw new Error("your  password is wrong");
  }

  const accessToken = jwt.sign(
    {
      role: user.role,
      id: user.id,
    },
    config.jwt_secret_key as Secret,
    { expiresIn: "365d" }
  );

  const userWithoutPassword = { ...user, password: undefined };

  return { user: userWithoutPassword, accessToken };
};
const getProfile = async (id: string, user: any): Promise<User | null> => {
  if (user.role == "user" && user.id !== id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You have no access");
  }
  console.log(user);
  if ((user.role == "user" && user.id == id) || user.role == "admin") {
    console.log(id);
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return result;
  }

  return null;
};
const updateProfile = async (id: string, data: any) => {
  console.log(id, data);
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      address: data.address,
      contactNo: data.contactNo,
    },
  });

  console.log(result);
  return result;
};

const changePassword = async (id: string, password: any) => {
  console.log(password);
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "current password is wrong");
  }
  const passwordValidation = await bcrypt.compare(
    password.currentPassword,
    result.password
  );

  if (!passwordValidation) {
    throw new Error("your  password is wrong");
  }
  const changePassword = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: password.password,
    },
  });

  return changePassword;
};

export const UserService = {
  insertIntoDB,
  userLogin,
  getProfile,
  updateProfile,
  changePassword,
};
