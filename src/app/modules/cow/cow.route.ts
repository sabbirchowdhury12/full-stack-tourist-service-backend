import express from "express";
import { CowController } from "./cow.controller";

const router = express.Router();

router.post("/cows", CowController.createCow);
export default router;
