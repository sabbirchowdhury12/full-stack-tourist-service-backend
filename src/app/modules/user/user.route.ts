import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post("/auth/signup", UserController.createUser);
router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get("/users/:id", UserController.getSingleUser);
router.patch("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.post("/auth/login", UserController.login);
router.post("/auth/refresh-token", UserController.refreshToken);

export default router;
