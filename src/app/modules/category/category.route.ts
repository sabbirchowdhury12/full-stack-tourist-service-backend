import express from "express";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post(
  "/create-category",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertToDB
);
router.get(
  "/",

  CategoryController.getAllFromDB
);

router.get(
  "/:id",

  CategoryController.getSingleFromDB
);
router.patch(
  "/:id",

  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateOneToDB
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteOneFromDB
);

export const CategoryRouter = router;
