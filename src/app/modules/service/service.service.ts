import { Prisma, Service } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const getAllService = async (filters: any, options: any) => {
  const { limit, page, skip, sortBy } =
    paginationHelpers.calculatePagination(options);

  const { search, minPrice, maxPrice } = filters;
  console.log(sortBy);
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
  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parseInt(minPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parseInt(maxPrice),
      },
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.service.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortBy
      ? {
          [sortBy]: "asc",
        }
      : {
          id: "asc",
        },
  });

  return result;
};

const getSingleFromDB = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
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
  getSingleFromDB,
};
