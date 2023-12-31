import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import uuid = require('uuid');
import { UserModel } from '../infrastructure/models/UserModel';
import { UserDataMapper } from '../infrastructure/mappers/UserDataMapper';

export class UserController {
  constructor(public dataMapper: UserDataMapper) {}

  public async getUsers(req: ExpressRequest, res: ExpressResponse) {
    try {
      const users = await UserModel.find();

      return res.status(200).json({
        data: users.map((user) => this.dataMapper.toUserDTO(user)),
        message: 'Get Users was Successful!',
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: error.message,
        message: 'Get data has an error!',
      });
    }
  }

  public async postUser(req: ExpressRequest, res: ExpressResponse) {
    try {
      const uuidv4: string = uuid.v4();
      const userId: string = uuidv4;
      const { email, fullName } = req.body;

      await UserModel.updateOne(
        {
          email,
        },
        [
          {
            $set: {
              userId,
              fullName,
            },
          },
        ],
        { upsert: true }
      );

      const users = await UserModel.find();

      return res.status(200).json({
        data: users.map((user) => this.dataMapper.toUserDTO(user)),
        message: 'Upsert User was Successful!',
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: error.message,
        message: 'Upsert data has an error!',
      });
    }
  }

  public async deleteUser(req: ExpressRequest, res: ExpressResponse) {
    try {
      const { id } = req.params;

      await UserModel.deleteOne({
        _id: id,
      });

      const users = await UserModel.find();

      return res.status(200).json({
        data: users.map((user) => this.dataMapper.toUserDTO(user)),
        message: 'Delete User was Successful!',
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: error.message,
        message: 'Delete data has an error!',
      });
    }
  }
}
