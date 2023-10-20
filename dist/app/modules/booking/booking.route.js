"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const booking_contoller_1 = require("./booking.contoller");
const validationRequest_ts_1 = __importDefault(require("../../middleware/validationRequest.ts"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post("/create-booking", (0, validationRequest_ts_1.default)(booking_validation_1.BookingValidation.createZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_contoller_1.BookingController.insertToDB);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_contoller_1.BookingController.getAllFromDB);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_contoller_1.BookingController.cancelBooking);
router.patch("/confirm-booking/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_contoller_1.BookingController.confirmBooking);
exports.BookingRouter = router;
