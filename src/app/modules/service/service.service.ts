import { Prisma, Service } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const getAllService = async (filters: any, options: any) => {
  const { limit, page, skip, sortBy } =
    paginationHelpers.calculatePagination(options);

  const { search, minPrice, maxPrice } = filters;

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
    console.log(minPrice);
    andConditions.push({
      price: {
        gte: parseInt(minPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    console.log(minPrice);
    andConditions.push({
      price: {
        lte: parseInt(maxPrice),
      },
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  console.log(whereConditions);
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
const getSingleFromDB = async (id: string) => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      reviews: {
        select: {
          comment: true,
          userId: true,
        },
      },
      ratings: {
        select: {
          rating: true,
          userId: true,
        },
      },
    },
  });

  // Fetch user names for reviews' userId
  const reviewUserIds = result?.reviews.map((review) => review.userId);
  const ratingUserIds = result?.ratings.map((rating) => rating.userId);

  const reviewUsers = await prisma.user.findMany({
    where: {
      id: {
        in: reviewUserIds,
      },
    },
    select: {
      id: true,
      name: true, // Select the 'name' field
    },
  });

  const ratingUsers = await prisma.user.findMany({
    where: {
      id: {
        in: ratingUserIds,
      },
    },
    select: {
      id: true,
      name: true, // Select the 'name' field
    },
  });

  // Map the user data to reviews and ratings
  const reviewsWithUserNames = result?.reviews.map((review) => ({
    ...review,
    user: reviewUsers.find((user) => user.id === review.userId),
  }));
  const ratingsWithUserNames = result?.ratings.map((rating) => ({
    ...rating,
    user: ratingUsers.find((user) => user.id === rating.userId),
  }));

  return {
    ...result,
    reviews: reviewsWithUserNames,
    ratings: ratingsWithUserNames,
  };
};

const insertIntoDB = async (data: any): Promise<Service> => {
  console.log(data);
  const result = await prisma.service.create({
    data,
  });

  return result;
};
const getAvailableService = async (
  searchValue: any
): Promise<Service[] | undefined> => {
  console.log(searchValue);
  if (searchValue) {
    const result = await prisma.service.findMany({
      where: {
        status: searchValue,
      },
    });

    return result;
  } else {
    const result = await prisma.service.findMany({});
    return result;
  }
};

export const ServicesService = {
  getAllService,
  insertIntoDB,
  getSingleFromDB,
  getAvailableService,
};
