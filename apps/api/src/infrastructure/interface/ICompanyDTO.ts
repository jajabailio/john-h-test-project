import { IUserDTO } from './IUserDTO';

export interface ICompanyDTO {
  _id: string;
  name: string;
  address: string;
  userId: string[];
  users: IUserDTO[];
}
