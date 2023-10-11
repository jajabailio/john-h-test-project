import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { UserModel } from "../infrastructure/models/UserModel";
import { UserDataMapper } from "../infrastructure/mappers/UserDataMapper";

export class UserController {
  constructor(public dataMapper: UserDataMapper) {}

  public async getUsers(req: ExpressRequest, res: ExpressResponse) {
    try {
      const users = await UserModel.find();

      return res.status(200).json({
        data: users.map((user) => this.dataMapper.toUserDTO(user)),
        message: "Get Users was Successful!",
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: error.message,
        message: "Get data has an error!",
      });
    }
  }
}
