import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user.service";
import { ResponseHandler } from "../utils/responseHandler";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      ResponseHandler.success(res, users, "Users fetched successfully");
    } catch (error) {
      next(error);
    }
  };
}
