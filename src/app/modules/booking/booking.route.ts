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
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.insertToDB
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getAllFromDB
);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.cancelBooking
);
router.patch(
  "/confirm-booking/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.confirmBooking
);

export const BookingRouter = router;
