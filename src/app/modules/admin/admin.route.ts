import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

router.post("/create-admin", adminController.createAdmin);

export const adminRoute = router;
