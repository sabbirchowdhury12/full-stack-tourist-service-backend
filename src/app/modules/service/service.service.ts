import { Prisma, Service } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const getAllService = async (filters: any) => {
  // const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { search, ...filtersData } = filters;
  console.log(search);
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: ["service_name", "location", "category"].map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.service.findMany({
    where: whereConditions,
  });

  return result;
};

const insertIntoDB = async (data: any): Promise<Service> => {
  const result = await prisma.service.create({
    data,
  });

  return result;
};

export const ServicesService = {
  getAllService,
  insertIntoDB,
};
