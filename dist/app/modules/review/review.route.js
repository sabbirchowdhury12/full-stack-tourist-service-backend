"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const validationRequest_ts_1 = __importDefault(require("../../middleware/validationRequest.ts"));
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.post("/create-review", (0, validationRequest_ts_1.default)(review_validation_1.ReviewRatingValidation.createReviewZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), review_controller_1.ReviewController.insertToDB);
router.post("/create-rating", (0, validationRequest_ts_1.default)(review_validation_1.ReviewRatingValidation.createRatingZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), review_controller_1.ReviewController.createRating);
exports.ReviewRouter = router;
