import express from "express";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { BookController } from "./book.controller";

const router = express.Router();

router.post(
  "/create-book",
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertToDB
);
router.get(
  "/",

  BookController.getAllFromDB
);

router.get(
  "/:id",

  BookController.getSingleFromDB
);
router.patch(
  "/:id",

  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateOneToDB
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteOneFromDB
);

export const BookRouter = router;
