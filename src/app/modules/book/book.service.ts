import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};
const getAllFromDB = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({});

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
