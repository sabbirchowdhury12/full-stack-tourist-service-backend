import { Prisma, Review, Rating, FAQ } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (data: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({
    data,
  });

  return result;
};
const getAllFromDB = async (): Promise<FAQ[]> => {
  const result = await prisma.fAQ.findMany({});

  return result;
};
const getSingleFromDB = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findUnique({
    where: {
      id,
    },
  });

  return result;
};
const updateOne = async (id: string, data: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.update({
    where: {
      id,
    },
    data,
  });

  return result;
};
const deleteOne = async (id: string): Promise<FAQ> => {
  const result = await prisma.fAQ.delete({
    where: {
      id,
    },
  });

  return result;
};

export const FAQService = {
  insertIntoDB,
  getAllFromDB,
  updateOne,
  deleteOne,
  getSingleFromDB,
};
