import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { CompanyModel } from '../infrastructure/models/CompanyModel';
import { CompanyDataMapper } from '../infrastructure/mappers/CompanyDataMapper';
import { UserModel } from '../infrastructure/models/UserModel';
import { IUserDTO } from '../infrastructure/interface/IUserDTO';
import { ICompanyDTO } from '../infrastructure/interface/ICompanyDTO';
export class CompanyController {
  constructor(public dataMapper: CompanyDataMapper) {}

  public async getCompanys(req: ExpressRequest, res: ExpressResponse) {
    try {
      const companies: ICompanyDTO[] = await CompanyModel.find();

      return res.status(200).json({
        data: companies.map((company) => this.dataMapper.toCompanyDTO(company)),
        message: 'Get Companies was Successful!',
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: error.message,
        message: 'Get data has an error!',
      });
    }
  }

  public async postCompany(req: ExpressRequest, res: ExpressResponse) {
    try {
      const { name, address, userId } = req.body;
      const users: IUserDTO[] = await UserModel.find({
        userId: { $in: userId },
      });

      await CompanyModel.updateOne(
        {
          name,
        },
        [
          {
            $set: {
              address,
              userId,
              users,
            },
          },
        ],
        { upsert: true }
      );

      const companies = await CompanyModel.find();

      return res.status(200).json({
        data: companies.map((company) => this.dataMapper.toCompanyDTO(company)),
        message: 'Upsert Company was Successful!',
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: error.message,
        message: 'Upsert data has an error!',
      });
    }
  }

  public async deleteCompany(req: ExpressRequest, res: ExpressResponse) {
    try {
      const { id } = req.params;

      await CompanyModel.deleteOne({
        _id: id,
      });

      const companies = await CompanyModel.find();

      return res.status(200).json({
        data: companies.map((company) => this.dataMapper.toCompanyDTO(company)),
        message: 'Delete Company was Successful!',
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
