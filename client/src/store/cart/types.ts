import { IDevice } from './../../models/IDevice';
export interface ICartItem extends IDevice {
  count: number;
  isSelected: boolean;
}
