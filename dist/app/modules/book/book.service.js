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
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllFromDB = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, minPrice, maxPrice, category } = filters, filtersData = __rest(filters, ["search", "minPrice", "maxPrice", "category"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: ["title", "author", "genre"].map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    // Filter by minimum price
    if (minPrice !== undefined) {
        andConditions.push({
            price: {
                gte: parseInt(minPrice), // Convert minPrice to a number
            },
        });
    }
    // Filter by maximum price
    if (maxPrice !== undefined) {
        andConditions.push({
            price: {
                lte: parseInt(maxPrice), // Convert maxPrice to a number
            },
        });
    }
    // Filter by category
    if (category) {
        andConditions.push({
            categoryId: category,
        });
    }
    //pagination
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                id: "asc",
            },
    });
    const total = yield prisma_1.default.book.count({});
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
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateOneToDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteOneFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
const getSingleByCategory = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                id: "asc",
            },
    });
    const total = yield prisma_1.default.book.count({});
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
exports.BookService = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB,
    updateOneToDB,
    deleteOneFromDB,
    getSingleByCategory,
};
