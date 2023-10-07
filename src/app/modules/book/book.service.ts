import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};
const getAllFromDB = async (options: any): Promise<Book[]> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.book.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            id: "asc",
          },
  });

  return result;
};
const getSingleFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneToDB = async (id: string, data: Book): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteOneFromDB = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BookService = {
  insertIntoDB,

  getAllFromDB,
  getSingleFromDB,
  updateOneToDB,
  deleteOneFromDB,
};
