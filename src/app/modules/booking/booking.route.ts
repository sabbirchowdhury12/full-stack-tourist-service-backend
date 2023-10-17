import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";
import { BookingController } from "./booking.contoller";
import validateRequest from "../../middleware/validationRequest.ts";
import { BookingValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/create-booking",
  validateRequest(BookingValidation.createZodSchema),
  auth(ENUM_USER_ROLE.USER),
  BookingController.insertToDB
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  BookingController.getAllFromDB
);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.cancelBooking
);
// router.get(
//   "/",
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
//   BookingContoller.getAllFromDB
// );
// router.get(
//   "/:orderId",
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
//   BookingContoller.getSingleFromDB
// );

export const BookingRouter = router;
