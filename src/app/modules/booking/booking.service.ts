import { BookAndShedule, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { AuthUser } from "../../../interfaces/user";
import { JwtPayload } from "jsonwebtoken";

const insertIntoDB = async (
  data: Prisma.BookAndSheduleCreateInput
): Promise<BookAndShedule> => {
  const result = await prisma.bookAndShedule.create({
    data,
  });

  return result;
};
const getAllFromDB = async (
  user: JwtPayload | undefined
): Promise<BookAndShedule[] | undefined> => {
  if (user?.role == "admin") {
    const result = await prisma.bookAndShedule.findMany({});
    return result;
  } else if (user?.role == "user") {
    const result = await prisma.bookAndShedule.findMany({
      where: {
        id: user?.id,
      },
    });

    return result;
  }
};

const cancelBooking = async (
  id: string,
  user: JwtPayload | undefined
): Promise<BookAndShedule | undefined> => {
  if (user?.role == "admin") {
    const result = await prisma.bookAndShedule.update({
      where: {
        id,
      },
      data: {
        status: "cancel",
      },
    });
    return result;
  } else if (user?.role == "user" && user?.id == id) {
    const result = await prisma.bookAndShedule.update({
      where: {
        id,
      },
      data: {
        status: "cancel",
      },
    });
    return result;
  }
};

export const BookingService = {
  insertIntoDB,
  getAllFromDB,
  cancelBooking,
};
