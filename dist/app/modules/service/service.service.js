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
exports.ServicesService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const getAllService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice } = filters;
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: ["service_name", "location"].map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (minPrice !== undefined) {
        andConditions.push({
            price: {
                gte: parseInt(minPrice),
            },
        });
    }
    if (maxPrice !== undefined) {
        andConditions.push({
            price: {
                lte: parseInt(maxPrice),
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.service.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : {
                createdAt: "asc",
            },
    });
    const total = yield prisma_1.default.service.count();
    const size = result.length;
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getSingleFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
        include: {
            reviews: {
                select: {
                    comment: true,
                    userId: true,
                },
            },
            ratings: {
                select: {
                    rating: true,
                    userId: true,
                },
            },
        },
    });
    // Fetch user names for reviews' userId
    const reviewUserIds = result === null || result === void 0 ? void 0 : result.reviews.map((review) => review.userId);
    const ratingUserIds = result === null || result === void 0 ? void 0 : result.ratings.map((rating) => rating.userId);
    const reviewUsers = yield prisma_1.default.user.findMany({
        where: {
            id: {
                in: reviewUserIds,
            },
        },
        select: {
            id: true,
            name: true,
            image: true, // Select the 'name' field
        },
    });
    const ratingUsers = yield prisma_1.default.user.findMany({
        where: {
            id: {
                in: ratingUserIds,
            },
        },
        select: {
            id: true,
            name: true,
            image: true, // Select the 'name' field
        },
    });
    // Map the user data to reviews and ratings
    const reviewsWithUserNames = result === null || result === void 0 ? void 0 : result.reviews.map((review) => (Object.assign(Object.assign({}, review), { user: reviewUsers.find((user) => user.id === review.userId) })));
    const ratingsWithUserNames = result === null || result === void 0 ? void 0 : result.ratings.map((rating) => (Object.assign(Object.assign({}, rating), { user: ratingUsers.find((user) => user.id === rating.userId) })));
    return Object.assign(Object.assign({}, result), { reviews: reviewsWithUserNames, ratings: ratingsWithUserNames });
});
const updateService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.create({
        data,
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.delete({
        where: {
            id,
        },
    });
    return result;
});
const getAvailableService = (searchValue) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchValue) {
        if (searchValue == "upcoming" || searchValue == "available") {
            const result = yield prisma_1.default.service.findMany({
                where: {
                    status: searchValue,
                },
                include: {
                    ratings: {
                        select: {
                            rating: true,
                        },
                    },
                    reviews: {
                        select: {
                            comment: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return result;
        }
        else {
            const result = yield prisma_1.default.service.findMany({
                where: {
                    category: searchValue,
                },
                include: {
                    ratings: {
                        select: {
                            rating: true,
                        },
                    },
                    reviews: {
                        select: {
                            comment: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return result;
        }
    }
    else {
        const result = yield prisma_1.default.service.findMany({});
        return result;
    }
});
exports.ServicesService = {
    getAllService,
    insertIntoDB,
    getSingleFromDB,
    getAvailableService,
    updateService,
    deleteFromDB,
};
