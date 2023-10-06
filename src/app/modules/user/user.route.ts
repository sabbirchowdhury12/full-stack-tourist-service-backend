import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post("/auth/signup", UserController.insertToDB);
router.post("/auth/login", UserController.userLogin);
router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);

export const UserRouter = router;
