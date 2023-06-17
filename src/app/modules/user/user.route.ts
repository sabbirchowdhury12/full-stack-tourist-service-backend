import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/auth/signup", UserController.createUser);
router.get("/users", UserController.getAllUsers);
export default router;
