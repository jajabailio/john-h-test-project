import { User } from './User';

export class Company {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public owner: User
  ) {}
}
