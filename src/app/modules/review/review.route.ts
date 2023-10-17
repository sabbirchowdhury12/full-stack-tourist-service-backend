import express from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import validateRequest from "../../middleware/validationRequest.ts";
import { ReviewRatingValidation } from "./review.validation";

const router = express.Router();

router.post(
  "/create-review",
  validateRequest(ReviewRatingValidation.createReviewZodSchema),
  auth(ENUM_USER_ROLE.USER),

  ReviewController.insertToDB
);
router.post(
  "/create-rating",
  validateRequest(ReviewRatingValidation.createRatingZodSchema),
  auth(ENUM_USER_ROLE.USER),
  ReviewController.createRating
);

export const ReviewRouter = router;
