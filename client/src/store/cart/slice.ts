import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDevice } from '../../models/IDevice';
import { ICartItem } from './types';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

interface cartSliceState {
  items: ICartItem[];
  totalPrice: number;
}

const initialState: cartSliceState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IDevice>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1, isSelected: true });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<number>) {
      const device = state.items.find((item) => item.id === action.payload);
      if (device) {
        device.count--;
      }
    },
    plusItem(state, action: PayloadAction<number>) {
      const device = state.items.find((item) => item.id === action.payload);
      if (device) {
        device.count++;
      }
    },
    addCertanAmountItems(
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        if (action.payload.count > 0) {
          findItem.count = action.payload.count;
        } else {
          findItem.count = 1;
        }
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    deleteAlItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    toggleSelectItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.isSelected = !findItem.isSelected;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const {
  addItem,
  minusItem,
  deleteItem,
  deleteAlItems,
  toggleSelectItem,
  addCertanAmountItems,
  plusItem,
} = cartSlice.actions;
export default cartSlice.reducer;
