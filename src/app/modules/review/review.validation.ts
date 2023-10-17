import { z } from "zod";

const createReviewZodSchema = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: "serviceId is required",
    }),

    userId: z.string({
      required_error: "userId is required",
    }),
    comment: z.string({
      required_error: "comment is required",
    }),
  }),
});
const createRatingZodSchema = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: "serviceId is required",
    }),

    userId: z.string({
      required_error: "userId is required",
    }),
    rating: z.string({
      required_error: "rating is required",
    }),
  }),
});

export const ReviewRatingValidation = {
  createReviewZodSchema,
  createRatingZodSchema,
};
