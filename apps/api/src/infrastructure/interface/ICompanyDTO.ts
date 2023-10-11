import { User } from '../entities/User';

export interface ICompanyDTO {
  id: string;
  name: string;
  address: string;
  owner: User;
}
