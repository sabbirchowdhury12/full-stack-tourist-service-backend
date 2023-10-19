import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import config from "../../../config";
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ENUM_USER_ROLE } from "../../../enums/user";

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
const getAllUser = async (user: JwtPayload | undefined): Promise<User[]> => {
  if (user?.role == "admin") {
    const result = await prisma.user.findMany({
      where: {
        role: "user",
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return result;
  } else {
    const result = await prisma.user.findMany({
      where: {
        role: {
          in: ["user", "admin"],
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return result;
  }
};
const getProfile = async (id: string, user: any): Promise<User | null> => {
  if (user.role == "user" && user.id !== id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You have no access");
  }

  if (
    (user.role == "user" && user.id == id) ||
    user?.role == ENUM_USER_ROLE.ADMIN ||
    user?.role == ENUM_USER_ROLE.SUPER_ADMIN
  ) {
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return result;
  }

  return null;
};
const updateProfile = async (
  id: string,
  user: JwtPayload | undefined,
  data: User
): Promise<User | undefined> => {
  if (
    (user?.role == "user" && user?.id == id) ||
    user?.role == ENUM_USER_ROLE.ADMIN ||
    user?.role == ENUM_USER_ROLE.SUPER_ADMIN
  ) {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return result;
  }
};

const changePassword = async (id: string, password: any) => {
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

const makeAdmin = async (id: string) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role: "admin",
    },
  });
  return result;
};

export const UserService = {
  insertIntoDB,
  userLogin,
  getProfile,
  updateProfile,
  changePassword,
  getAllUser,
  makeAdmin,
};
