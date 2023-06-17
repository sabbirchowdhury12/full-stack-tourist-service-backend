import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), ".env") });

export default {
  database_url: process.env.MONGOOSE_URL,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
};
