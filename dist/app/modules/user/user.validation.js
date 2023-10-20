"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const createZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required",
        }),
        email: zod_1.z.string({
            required_error: "email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        address: zod_1.z
            .string({
            required_error: "email is required",
        })
            .optional(),
        contactNo: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .optional(),
        image: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Old password  is required",
        }),
        currentPassword: zod_1.z.string({
            required_error: "New password  is required",
        }),
    }),
});
exports.AuthValidation = {
    createZodSchema,
    loginZodSchema,
    changePasswordZodSchema,
};
