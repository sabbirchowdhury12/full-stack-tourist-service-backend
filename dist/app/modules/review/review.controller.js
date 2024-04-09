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
exports.ReviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const review_service_1 = require("./review.service");
const insertToDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = req.body;
        const result = yield review_service_1.ReviewService.insertIntoDB(bookingData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Review  successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.ReviewService.getAllReview();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Review Fetched  successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const createRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = req.body;
        const result = yield review_service_1.ReviewService.createRating(bookingData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Rating  successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ReviewController = {
    insertToDB,
    createRating,
    getAllReview,
};
