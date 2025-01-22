import User from "../models/user.model";

export class UserService {
  public async getUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }
}
