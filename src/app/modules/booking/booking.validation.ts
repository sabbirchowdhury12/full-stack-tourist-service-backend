import { z } from "zod";

const createZodSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: "date is required",
    }),
    status: z
      .string({
        required_error: "status is required",
      })
      .optional(),
    serviceId: z.string({
      required_error: "serviceId is required",
    }),
    userId: z.string({
      required_error: "userId is required",
    }),
  }),
});

export const BookingValidation = {
  createZodSchema,
};
