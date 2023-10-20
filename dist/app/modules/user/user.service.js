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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_1 = require("../../../enums/user");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data === null || data === void 0 ? void 0 : data.password) {
        const hashPassword = yield bcrypt_1.default.hash(data.password, 10);
        data.password = hashPassword;
    }
    const result = yield prisma_1.default.user.create({
        data,
    });
    const accessToken = jsonwebtoken_1.default.sign({
        role: result.role,
        id: result.id,
    }, config_1.default.jwt_secret_key, { expiresIn: "365d" });
    const { password } = result, others = __rest(result, ["password"]);
    return { user: others, accessToken };
});
const userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApiError_1.default(404, "User not found");
    }
    const passwordValidation = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValidation) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "your  password is wrong");
    }
    const accessToken = jsonwebtoken_1.default.sign({
        role: user.role,
        id: user.id,
    }, config_1.default.jwt_secret_key, { expiresIn: "365d" });
    const userWithoutPassword = Object.assign(Object.assign({}, user), { password: undefined });
    return { user: userWithoutPassword, accessToken };
});
const getAllUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if ((user === null || user === void 0 ? void 0 : user.role) == "admin") {
        const result = yield prisma_1.default.user.findMany({
            where: {
                role: "user",
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        return result;
    }
    else {
        const result = yield prisma_1.default.user.findMany({
            where: {
                role: {
                    in: ["user", "admin"],
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        return result;
    }
});
const getProfile = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role == "user" && user.id !== id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You have no access");
    }
    if ((user.role == "user" && user.id == id) ||
        (user === null || user === void 0 ? void 0 : user.role) == user_1.ENUM_USER_ROLE.ADMIN ||
        (user === null || user === void 0 ? void 0 : user.role) == user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        const result = yield prisma_1.default.user.findUnique({
            where: {
                id,
            },
        });
        return result;
    }
    return null;
});
const updateProfile = (id, user, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (((user === null || user === void 0 ? void 0 : user.role) == "user" && (user === null || user === void 0 ? void 0 : user.id) == id) ||
        (user === null || user === void 0 ? void 0 : user.role) == user_1.ENUM_USER_ROLE.ADMIN ||
        (user === null || user === void 0 ? void 0 : user.role) == user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        const result = yield prisma_1.default.user.update({
            where: {
                id,
            },
            data,
        });
        return result;
    }
});
const changePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "current password is wrong");
    }
    const passwordValidation = yield bcrypt_1.default.compare(password.currentPassword, result.password);
    if (!passwordValidation) {
        throw new Error("your  password is wrong");
    }
    const changePassword = yield prisma_1.default.user.update({
        where: {
            id: id,
        },
        data: {
            password: password.password,
        },
    });
    return changePassword;
});
const makeAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            role: "admin",
        },
    });
    return result;
});
exports.UserService = {
    insertIntoDB,
    userLogin,
    getProfile,
    updateProfile,
    changePassword,
    getAllUser,
    makeAdmin,
};
