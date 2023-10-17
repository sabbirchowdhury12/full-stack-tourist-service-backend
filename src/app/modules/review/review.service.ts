import { Prisma, Review, Rating } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (
  data: Prisma.ReviewCreateInput
): Promise<Review> => {
  const result = await prisma.review.create({
    data,
  });

  return result;
};
const createRating = async (
  data: Prisma.RatingCreateInput
): Promise<Rating> => {
  const result = await prisma.rating.create({
    data,
  });

  return result;
};

export const ReviewService = {
  insertIntoDB,
  createRating,
};
