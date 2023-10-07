import { Book, Prisma } from "@prisma/client";
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
const getAllFromDB = async (options: any, filters: any) => {
  const { search, minPrice, maxPrice, category, ...filtersData } = filters;

  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: ["title", "author", "genre"].map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  // Filter by minimum price
  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parseInt(minPrice), // Convert minPrice to a number
      },
    });
  }

  // Filter by maximum price
  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parseInt(maxPrice), // Convert maxPrice to a number
      },
    });
  }

  // Filter by category
  if (category) {
    andConditions.push({
      categoryId: category,
    });
  }

  //pagination
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
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

  const total = await prisma.book.count({});
  const size = result.length;
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
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

const getSingleByCategory = async (categoryId: string, options: any) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
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

  const total = await prisma.book.count({});
  const size = result.length;
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

export const BookService = {
  insertIntoDB,

  getAllFromDB,
  getSingleFromDB,
  updateOneToDB,
  deleteOneFromDB,
  getSingleByCategory,
};
