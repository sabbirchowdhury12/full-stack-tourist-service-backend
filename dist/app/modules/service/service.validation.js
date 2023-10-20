"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        service_name: zod_1.z.string({
            required_error: "service_name is required",
        }),
        category: zod_1.z.string({
            required_error: "category is required",
        }),
        location: zod_1.z.string({
            required_error: "location is required",
        }),
        price: zod_1.z.number({
            required_error: "price is required",
        }),
        image: zod_1.z.string({
            required_error: "image is required",
        }),
        status: zod_1.z
            .string({
            required_error: "status is required",
        })
            .optional(),
    }),
});
exports.ServiceValidation = {
    createZodSchema,
};
