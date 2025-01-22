import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import { rateLimiter } from "./middleware/rateLimiter";
import routes from "./routes/api.routes";
import { env } from "./config/env";

export const createApp = () => {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors());
  app.use(rateLimiter);

  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());

  // Request logging
  app.use(requestLogger);

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: true,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use(`/api/${env.API_VERSION}`, routes);

  // 404 handler
  app.use("*", (req, res) => {
    res.status(404).json({
      status: false,
      data: null,
      message: `Route not found. Cannot ${req.method} ${req.originalUrl}`,
    });
  });

  // Error handler
  app.use(errorHandler);

  return app;
};
