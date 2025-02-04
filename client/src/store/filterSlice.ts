import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface filterSliceState {
  search: string;
  categoryId: null | number;
}

const initialState: filterSliceState = {
  search: '',
  categoryId: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
  },
});

export const { setSearch, setCategory } = filterSlice.actions;

export default filterSlice.reducer;
