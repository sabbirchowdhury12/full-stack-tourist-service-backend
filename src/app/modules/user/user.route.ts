import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/auth/signup", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getSingleUser);

export default router;
