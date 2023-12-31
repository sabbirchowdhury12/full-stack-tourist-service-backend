import express from "express";
import { ServiceController } from "./service.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import validateRequest from "../../middleware/validationRequest.ts";
import { ServiceValidation } from "./service.validation";

const router = express.Router();

router.get("/", ServiceController.getAllService);

router.get("/category", ServiceController.getAvailableService);
router.get("/:id", ServiceController.getSingleFromDB);
router.post(
  "/create-service",
  validateRequest(ServiceValidation.createZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceController.insertIntoDB
);
router.patch(
  "/:id",

  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceController.updateService
);

router.delete("/:id", ServiceController.deleteFromDB);

export const ServiceRouter = router;
