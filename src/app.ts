import express, { Request, Response } from "express";
import cors from "cors";
import createdUserRouter from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
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

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

export default app;
