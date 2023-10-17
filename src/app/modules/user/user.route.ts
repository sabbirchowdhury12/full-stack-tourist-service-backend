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
  "/profile/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.getProfile
);
router.post(
  "/profile/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.updateProfile
);
router.post(
  "/change-password/:id",
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),

  UserController.changePassword
);

export const UserRouter = router;
