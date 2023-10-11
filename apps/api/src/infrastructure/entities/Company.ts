import { User } from './User';

export class Company {
  constructor(
    public _id: string,
    public name: string,
    public address: string,
    public userId: [string],
    public users: User
  ) {}
}
