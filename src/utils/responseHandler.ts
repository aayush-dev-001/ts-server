import { Response } from "express";
import { ApiResponse } from "../types/response";

export class ResponseHandler {
  static success<T>(
    res: Response,
    data: T,
    msg: string,
    statusCode = 200
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      msg: msg,
    };
    res.status(statusCode).json(response);
  }

  static error(res: Response, error: Error, statusCode = 500): void {
    const response: ApiResponse = {
      success: false,
      error: {
        code: error.name,
        message: error.message,
        details:
          process.env.NODE_ENV === "development"
            ? (error as any).stack
            : undefined,
      },
    };
    res.status(statusCode).json(response);
  }
}
