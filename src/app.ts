import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import createdUserRouter from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import httpStatus from "http-status";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api/v1", createdUserRouter);

app.use(globalErrorHandler);

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

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

export default app;
