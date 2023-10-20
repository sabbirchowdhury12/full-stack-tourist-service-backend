"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRatingValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: "serviceId is required",
        }),
        userId: zod_1.z.string({
            required_error: "userId is required",
        }),
        comment: zod_1.z.string({
            required_error: "comment is required",
        }),
    }),
});
const createRatingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: "serviceId is required",
        }),
        userId: zod_1.z.string({
            required_error: "userId is required",
        }),
        rating: zod_1.z.string({
            required_error: "rating is required",
        }),
    }),
});
exports.ReviewRatingValidation = {
    createReviewZodSchema,
    createRatingZodSchema,
};
