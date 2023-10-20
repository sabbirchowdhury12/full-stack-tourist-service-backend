"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const booking_service_1 = require("./booking.service");
const insertToDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = req.body;
        const result = yield booking_service_1.BookingService.insertIntoDB(bookingData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Service  booked successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllFromDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { statusValue } = req.query;
        const result = yield booking_service_1.BookingService.getAllFromDB(user, statusValue);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Booking Data fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const cancelBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const id = req.params.id;
        const result = yield booking_service_1.BookingService.cancelBooking(id, user);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Cancel booking successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const confirmBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield booking_service_1.BookingService.confirmBooking(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Confirmed booking successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BookingController = {
    insertToDB,
    getAllFromDB,
    cancelBooking,
    confirmBooking,
};
