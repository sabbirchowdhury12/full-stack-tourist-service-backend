import { Server } from "http";
import config from "./config";
import app from "./app";

async function dbConnect() {
  try {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.log("database connect failed", err);
  }
}

dbConnect();
