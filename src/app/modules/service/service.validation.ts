import { z } from "zod";

const createZodSchema = z.object({
  body: z.object({
    service_name: z.string({
      required_error: "service_name is required",
    }),
    category: z.string({
      required_error: "category is required",
    }),
    location: z.string({
      required_error: "location is required",
    }),
    price: z.number({
      required_error: "price is required",
    }),

    image: z.string({
      required_error: "image is required",
    }),
    status: z
      .string({
        required_error: "status is required",
      })
      .optional(),
  }),
});

export const ServiceValidation = {
  createZodSchema,
};
