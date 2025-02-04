import { IUser } from "./IUser";

export interface IReview {
  id: number;
  rate: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  deviceId: number;
  userId: number;
  user: IUser
}
