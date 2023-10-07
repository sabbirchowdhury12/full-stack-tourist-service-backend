import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post("/auth/signup", UserController.insertToDB);
router.post("/auth/signin", UserController.userLogin);
router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);
router.get(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleFromDB
);
router.patch(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateOneToDB
);
router.delete(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteOneFromDB
);

export const UserRouter = router;
