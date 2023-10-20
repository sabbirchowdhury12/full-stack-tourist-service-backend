"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.object({}),
        status: zod_1.z
            .string({
            required_error: "status is required",
        })
            .optional(),
        serviceId: zod_1.z.string({
            required_error: "serviceId is required",
        }),
        userId: zod_1.z.string({
            required_error: "userId is required",
        }),
    }),
});
exports.BookingValidation = {
    createZodSchema,
};
