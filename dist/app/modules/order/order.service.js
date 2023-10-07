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
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (orderedBooks, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userInfo);
    const order = yield prisma_1.default.order.create({
        data: {
            userId: userInfo.userId,
            orderedBooks: {
                createMany: {
                    data: orderedBooks.map((item) => ({
                        bookId: item.bookId,
                        quantity: item.quantity,
                    })),
                },
            },
        },
        include: {
            orderedBooks: {
                include: {
                    book: true,
                },
            },
        },
    });
    const data = {
        id: order.id,
        userId: order.userId,
        orderedBooks: order.orderedBooks.map((item) => ({
            bookId: item.book.id,
            quantity: item.quantity,
        })),
        status: order.status,
        createdAt: order.createdAt,
    };
    return data;
});
const getAllFromDB = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = userInfo;
    // Define the Prisma query options based on the user's role
    const queryOptions = {
        include: {
            orderedBooks: {
                select: {
                    bookId: true,
                    quantity: true,
                },
            },
        },
    };
    if (role === "admin") {
        return yield prisma_1.default.order.findMany(queryOptions);
    }
    else if (role === "customer") {
        return yield prisma_1.default.order.findMany(Object.assign(Object.assign({}, queryOptions), { where: {
                userId: userId,
            } }));
    }
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
};
