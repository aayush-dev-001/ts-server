import rateLimit from "express-rate-limit";
import { env } from "../config/env";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: env.isDevelopment ? 100 : 30, // limit each IP to 100 requests per windowMs
  message: {
    status: false,
    message: "Too many requests, please try again later.",
  },
});
