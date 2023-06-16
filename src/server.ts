import mongoose from "mongoose";
import { Server } from "http";
import config from "./config";
import app from "./app";

async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("database connect successfully");
    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("database connect failed", err);
  }
}

dbConnect();
