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
  user: JwtPayload | undefined,
  statusValue: any
): Promise<BookAndShedule[] | undefined> => {
  let result;

  if (user?.role == "admin") {
    if (statusValue == "all") {
      result = await prisma.bookAndShedule.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          service: {
            select: {
              service_name: true,
            },
          },
        },
      });
    } else if (statusValue == "cancel" || statusValue == "active") {
      result = await prisma.bookAndShedule.findMany({
        where: {
          status: statusValue,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          service: {
            select: {
              service_name: true,
            },
          },
        },
      });
    }
  } else if (user?.role == "user") {
    if (statusValue == "all") {
      result = await prisma.bookAndShedule.findMany({
        where: {
          userId: user.id,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          service: {
            select: {
              service_name: true,
            },
          },
        },
      });
    } else if (statusValue == "cancel" || statusValue == "active") {
      result = await prisma.bookAndShedule.findMany({
        where: {
          userId: user.id,
          status: statusValue,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          service: {
            select: {
              service_name: true,
            },
          },
        },
      });
    }
  }

  return result;
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
  } else if (user?.role == "user") {
    const booking = await prisma.bookAndShedule.findUnique({
      where: {
        id,
      },
    });
    if (booking?.userId == user?.id) {
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
  }
};

export const BookingService = {
  insertIntoDB,
  getAllFromDB,
  cancelBooking,
};
