import { ICartItem } from '../store/cart/types';

export const calcTotalPrice = (items: ICartItem[]) => {
  return items.reduce((acc, item) => {
    if (item.isSelected) {
      return (acc += item.count * item.price);
    } else {
      return acc;
    }
  }, 0);
};
