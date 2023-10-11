import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validationRequest.ts";
import { AuthValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(AuthValidation.createZodSchema),
  UserController.insertToDB
);
router.post("/auth/login", UserController.userLogin);

// router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);
// router.get(
//   "/profile",
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
//   UserController.getProfile
// );
// router.get(
//   "/users/:id",
//   auth(ENUM_USER_ROLE.ADMIN),
//   UserController.getSingleFromDB
// );
// router.patch(
//   "/users/:id",
//   auth(ENUM_USER_ROLE.ADMIN),
//   UserController.updateOneToDB
// );
// router.delete(
//   "/users/:id",
//   auth(ENUM_USER_ROLE.ADMIN),
//   UserController.deleteOneFromDB
// );

export const UserRouter = router;
