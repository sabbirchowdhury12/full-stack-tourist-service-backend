"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQRouter = void 0;
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("./faq.controller");
const router = express_1.default.Router();
router.post("/create-faq", 
//   auth(ENUM_USER_ROLE.USER),
faq_controller_1.FAQController.insertIntoDB);
router.get("/", 
//   auth(ENUM_USER_ROLE.USER),
faq_controller_1.FAQController.getAllFromDB);
router.get("/:id", 
//   auth(ENUM_USER_ROLE.USER),
faq_controller_1.FAQController.getSingleFromDB);
router.patch("/:id", 
//   auth(ENUM_USER_ROLE.USER),
faq_controller_1.FAQController.updateOne);
router.delete("/:id", 
//   auth(ENUM_USER_ROLE.USER),
faq_controller_1.FAQController.deleteOne);
// router.get("/", FAQController.getAllReview);
// router.post(
//   "/create-rating",
//   validateRequest(ReviewRatingValidation.createRatingZodSchema),
//   auth(ENUM_USER_ROLE.USER),
//   ReviewController.createRating
// );
exports.FAQRouter = router;
