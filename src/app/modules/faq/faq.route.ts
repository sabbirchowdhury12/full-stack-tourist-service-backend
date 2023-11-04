import express from "express";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { FAQController } from "./faq.controller";
const router = express.Router();

router.post(
  "/create-faq",

  //   auth(ENUM_USER_ROLE.USER),

  FAQController.insertIntoDB
);
router.get(
  "/",

  //   auth(ENUM_USER_ROLE.USER),

  FAQController.getAllFromDB
);
router.get(
  "/:id",

  //   auth(ENUM_USER_ROLE.USER),

  FAQController.getSingleFromDB
);
router.patch(
  "/:id",

  //   auth(ENUM_USER_ROLE.USER),

  FAQController.updateOne
);
router.delete(
  "/:id",

  //   auth(ENUM_USER_ROLE.USER),

  FAQController.deleteOne
);
// router.get("/", FAQController.getAllReview);
// router.post(
//   "/create-rating",
//   validateRequest(ReviewRatingValidation.createRatingZodSchema),
//   auth(ENUM_USER_ROLE.USER),
//   ReviewController.createRating
// );

export const FAQRouter = router;
