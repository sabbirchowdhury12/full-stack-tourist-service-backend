import express from "express";
import { ServiceController } from "./service.controller";

const router = express.Router();

router.get("/", ServiceController.getAllService);
router.post("/create-service", ServiceController.insertIntoDB);

export const ServiceRouter = router;
