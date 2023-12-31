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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const insertToDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_service_1.UserService.insertIntoDB(user);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Users created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield user_service_1.UserService.userLogin(email, password);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Login successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const result = yield user_service_1.UserService.getAllUser(user);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = req.user;
        const result = yield user_service_1.UserService.getProfile(id, user);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Profile get successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = req.user;
        const userData = req.body;
        const result = yield user_service_1.UserService.updateProfile(id, user, userData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "updated successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const password = req.body;
        const result = yield user_service_1.UserService.changePassword(id, password);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Password Changed successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const makeAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield user_service_1.UserService.makeAdmin(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Make admin successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
    insertToDB,
    userLogin,
    getProfile,
    updateProfile,
    changePassword,
    getAllUser,
    makeAdmin,
};
