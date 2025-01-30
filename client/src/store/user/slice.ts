import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

interface userSliceState {
  isAuth: boolean;
  user: User | null;
  token: string | null;
}

const initialState: userSliceState = {
  isAuth: false,
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; token: string }>) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    logout(state) {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
