import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import httpStatus from "http-status";

import { UserRouter } from "./app/modules/user/user.route";
import { ServiceRouter } from "./app/modules/service/service.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/service", ServiceRouter);
app.use("/api/v1", UserRouter);

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
