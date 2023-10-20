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
exports.BookingService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_1 = require("../../../enums/user");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookAndShedule.create({
        data,
    });
    return result;
});
const getAllFromDB = (user, statusValue) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if ((user === null || user === void 0 ? void 0 : user.role) == user_1.ENUM_USER_ROLE.ADMIN ||
        (user === null || user === void 0 ? void 0 : user.role) == user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        if (statusValue == "all") {
            result = yield prisma_1.default.bookAndShedule.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                    service: {
                        select: {
                            service_name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
        }
        else {
            result = yield prisma_1.default.bookAndShedule.findMany({
                where: {
                    status: statusValue,
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                    service: {
                        select: {
                            service_name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
        }
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) == "user") {
        if (statusValue == "all") {
            result = yield prisma_1.default.bookAndShedule.findMany({
                where: {
                    userId: user.id,
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                    service: {
                        select: {
                            service_name: true,
                        },
                    },
                },
            });
        }
        else if (statusValue == "cancel" || statusValue == "active") {
            result = yield prisma_1.default.bookAndShedule.findMany({
                where: {
                    userId: user.id,
                    status: statusValue,
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                    service: {
                        select: {
                            service_name: true,
                        },
                    },
                },
            });
        }
    }
    return result;
});
const cancelBooking = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if ((user === null || user === void 0 ? void 0 : user.role) == user_1.ENUM_USER_ROLE.ADMIN ||
        (user === null || user === void 0 ? void 0 : user.role) == user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        const result = yield prisma_1.default.bookAndShedule.update({
            where: {
                id,
            },
            data: {
                status: "canceled",
            },
        });
        return result;
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) == "user") {
        const booking = yield prisma_1.default.bookAndShedule.findUnique({
            where: {
                id,
            },
        });
        if ((booking === null || booking === void 0 ? void 0 : booking.userId) == (user === null || user === void 0 ? void 0 : user.id)) {
            const result = yield prisma_1.default.bookAndShedule.update({
                where: {
                    id,
                },
                data: {
                    status: "canceled",
                },
            });
            return result;
        }
    }
});
const confirmBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookAndShedule.update({
        where: {
            id,
        },
        data: {
            status: "confirmed",
        },
    });
    return result;
});
exports.BookingService = {
    insertIntoDB,
    getAllFromDB,
    cancelBooking,
    confirmBooking,
};
