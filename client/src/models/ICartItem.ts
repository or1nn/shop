import { IDevice } from "./IDevice";

export interface ICartItem extends IDevice {
  count: number;
  isSelected: boolean;
}
