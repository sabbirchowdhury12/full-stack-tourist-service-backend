import express from "express";

import { OrderController } from "./order.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  OrderController.getAllOrder
);

export default router;
