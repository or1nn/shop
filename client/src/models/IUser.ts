import { IDevice } from "./IDevice";

export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  avatar: string;
  favorites: {id: number, userId: number, deviceId: number, device: IDevice}[];
}
