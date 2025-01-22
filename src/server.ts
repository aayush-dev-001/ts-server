import cluster from "cluster";
import os from "os";
import { createApp } from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";

const displayStartupMessage = () => {
  const divider = "=".repeat(50);
  console.log("\n" + divider);
  console.log(`🚀 Server Information`);
  console.log(divider);
  console.log(`📱 Environment: ${env.NODE_ENV}`);
  console.log(
    `🔗 API URL: http://localhost:${env.PORT}/api/${env.API_VERSION}`
  );
  console.log(`💡 Health Check: http://localhost:${env.PORT}/health`);
  console.log(`🔄 Workers: ${env.MAX_WORKERS || os.cpus().length}`);
  console.log(`⚡️ Process ID: ${process.pid}`);
  console.log(divider + "\n");
};

const startServer = () => {
  const app = createApp();
  const numCPUs = env.MAX_WORKERS || os.cpus().length;

  if (cluster.isPrimary) {
    displayStartupMessage();
    logger.info(`Primary ${process.pid} is running`);
    logger.info(`Starting ${numCPUs} workers...`);

    // Fork workers based on CPU cores or MAX_WORKERS env variable
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      logger.warn(
        `Worker ${worker.process.pid} died. Code: ${code}, Signal: ${signal}`
      );
      logger.info("Starting a new worker...");
      cluster.fork();
    });

    // Log when a worker connects
    cluster.on("online", (worker) => {
      logger.info(`Worker ${worker.process.pid} is online`);
    });

    // Handle uncaught exceptions in the primary process
    process.on("uncaughtException", (error) => {
      logger.error("Uncaught Exception:", error);
      process.exit(1);
    });

    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Rejection at:", promise, "reason:", reason);
    });
  } else {
    // Worker process
    const server = app.listen(env.PORT, () => {
      logger.info(`Worker ${process.pid} started on port ${env.PORT}`);
    });

    // Graceful shutdown
    const shutdown = () => {
      logger.info("Received kill signal, shutting down gracefully");
      server.close(() => {
        logger.info("Closed out remaining connections");
        process.exit(0);
      });

      // Force shutdown after 30 seconds
      setTimeout(() => {
        logger.error(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 30000);
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  }
};

// Start the server
startServer();
