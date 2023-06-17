import express from "express";
import { CowController } from "./cow.controller";

const router = express.Router();

router.post("/cows", CowController.createCow);
router.get("/cows", CowController.getAllCows);
router.get("/cows/:id", CowController.getSingleCow);
router.delete("/cows/:id", CowController.deleteCow);
export default router;
