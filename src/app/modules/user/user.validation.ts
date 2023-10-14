import { z } from "zod";

const createZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z.string({
      required_error: "email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    address: z
      .string({
        required_error: "email is required",
      })
      .optional(),
    contactNo: z
      .string({
        required_error: "Password is required",
      })
      .optional(),
    image: z
      .string({
        required_error: "Password is required",
      })
      .optional(),
  }),
});

// const loginZodSchema = z.object({
//   body: z.object({
//     id: z.string({
//       required_error: 'ID is required',
//     }),
//     password: z.string({
//       required_error: 'Password is required',
//     }),
//   }),
// });

// const refreshTokenZodSchema = z.object({
//   cookies: z.object({
//     refreshToken: z.string({
//       required_error: 'Refresh Token is required',
//     }),
//   }),
// });

// const changePasswordZodSchema = z.object({
//   body: z.object({
//     oldPassword: z.string({
//       required_error: 'Old password  is required',
//     }),
//     newPassword: z.string({
//       required_error: 'New password  is required',
//     }),
//   }),
// });

export const AuthValidation = {
  createZodSchema,
};
