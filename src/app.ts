import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import httpStatus from "http-status";

import cookieParser from "cookie-parser";
import { UserRouter } from "./app/modules/user/user.route";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", UserRouter);
// app.use("/api/v1/cows", cowRouter);
// app.use("/api/v1/orders", orderRoute);
// app.use("/api/v1/admins", adminRoute);

app.use(globalErrorHandler);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
