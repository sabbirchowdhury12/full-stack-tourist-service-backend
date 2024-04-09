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
exports.ServiceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_service_1 = require("./service.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const getAllService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
        const filters = (0, pick_1.default)(req.query, ["search", "minPrice", "maxPrice"]);
        const result = yield service_service_1.ServicesService.getAllService(filters, options);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Service fetched successfully",
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
const insertIntoDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield service_service_1.ServicesService.insertIntoDB(data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "service created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const serviceData = req.body;
        const result = yield service_service_1.ServicesService.updateService(id, serviceData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "service updated successfully",
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
        const result = yield service_service_1.ServicesService.getSingleFromDB(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "service created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteFromDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield service_service_1.ServicesService.deleteFromDB(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "service deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAvailableService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchValue } = req.query;
        const result = yield service_service_1.ServicesService.getAvailableService(searchValue);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Availeable service fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ServiceController = {
    getAllService,
    insertIntoDB,
    getSingleFromDB,
    getAvailableService,
    updateService,
    deleteFromDB,
};
