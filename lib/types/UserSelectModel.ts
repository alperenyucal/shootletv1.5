import { User } from '../models/UserModel';

export interface UserSelectModel extends User {
  __v: number;
  _id: string;
}
