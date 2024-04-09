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
exports.FAQController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const faq_service_1 = require("./faq.service");
const insertIntoDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = req.body;
        const result = yield faq_service_1.FAQService.insertIntoDB(bookingData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "FAQ create  successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllFromDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield faq_service_1.FAQService.getAllFromDB();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "FAQ fetched  successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleFromDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield faq_service_1.FAQService.getSingleFromDB(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "FAQ fetched  successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = yield faq_service_1.FAQService.updateOne(id, data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "FAQ updated  successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield faq_service_1.FAQService.deleteOne(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "FAQ deleted  successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.FAQController = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB,
    updateOne,
    deleteOne,
};
