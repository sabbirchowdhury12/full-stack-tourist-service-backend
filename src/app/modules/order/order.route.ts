import express from "express";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post(
  "/create-order",
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.insertToDB
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllFromDB
);

export const OrderRouter = router;
