import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post("/auth/signup", UserController.createUser);
router.get(
  "/users/my-profile",
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  UserController.getProfile
);
router.patch(
  "/users/my-profile",
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  UserController.updateProfile
);
router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);
router.patch(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);
router.delete(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);

router.post("/auth/login", UserController.login);
router.post("/auth/refresh-token", UserController.refreshToken);

export default router;
