import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../utils/responseHandler";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[Error] ${error.stack}`);

  // Default error status and message
  const status = error.status || 500;
  const errorResponse = {
    success: false,
    error: {
      code: error.code || error.name || "INTERNAL_SERVER_ERROR",
      message: error.message || "An unexpected error occurred",
      path: req.path,
      method: req.method,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    },
  };

  res.status(status).json(errorResponse);
};
