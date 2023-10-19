import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validationRequest.ts";
import { AuthValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(AuthValidation.createZodSchema),
  UserController.insertToDB
);
router.post(
  "/auth/login",
  validateRequest(AuthValidation.loginZodSchema),
  UserController.userLogin
);
router.get(
  "/get-users",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUser
);
router.get(
  "/profile/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getProfile
);

router.patch(
  "/profile/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateProfile
);
router.post(
  "/change-password/:id",
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),

  UserController.changePassword
);

router.patch(
  "/make-admin/:id",

  auth(ENUM_USER_ROLE.SUPER_ADMIN),

  UserController.makeAdmin
);

export const UserRouter = router;
