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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const user_route_1 = require("./app/modules/user/user.route");
const service_route_1 = require("./app/modules/service/service.route");
const booking_route_1 = require("./app/modules/booking/booking.route");
const review_route_1 = require("./app/modules/review/review.route");
const faq_route_1 = require("./app/modules/faq/faq.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "https://full-stack-tourist-service-frontend.vercel.app/" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/service", service_route_1.ServiceRouter);
app.use("/api/v1", user_route_1.UserRouter);
app.use("/api/v1/booking", booking_route_1.BookingRouter);
app.use("/api/v1/review", review_route_1.ReviewRouter);
app.use("/api/v1/faq", faq_route_1.FAQRouter);
app.use(globalErrorHandler_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello World!");
}));
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "route Not Found",
        errorMessages: [
            {
                path: req.path,
                message: "api not found",
            },
        ],
    });
    next();
});
exports.default = app;
