"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/create-book", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.insertToDB);
router.get("/", book_controller_1.BookController.getAllFromDB);
router.get("/:id/category", book_controller_1.BookController.getSingleByCategory);
router.get("/:id", book_controller_1.BookController.getSingleFromDB);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.updateOneToDB);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.deleteOneFromDB);
exports.BookRouter = router;
