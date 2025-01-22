import { cleanEnv, str, port, num } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
  }),
  PORT: port({ default: 3000 }),
  MAX_WORKERS: num({ default: 0 }), // 0 means use all CPU cores
  API_VERSION: str({ default: "v1" }),
});
