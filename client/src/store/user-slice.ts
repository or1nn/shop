import { createSlice } from '@reduxjs/toolkit';
import { IDevice } from '../models/IDevice';
import { IUser } from '../models/IUser';
import { userApi } from '../services/user-api';
import { favoritesApi } from '../services/favorites-api';

interface userSliceState {
  isAuth: boolean;
  current: IUser | null;
  favorites: {
    id: number;
    userId: number;
    deviceId: number;
    device: IDevice;
  }[];
  token: string | null;
}

const initialState: userSliceState = {
  isAuth: false,
  current: null,
  token: null,
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      localStorage.clear();
      state.current = null;
      state.token = null;
      state.isAuth = false;
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.current = action.payload;
        state.favorites = action.payload.favorites;
        state.isAuth = true;
      })
      .addMatcher(
        favoritesApi.endpoints.addFavorite.matchFulfilled,
        (state, action) => {
          state.favorites.push(action.payload);
        }
      )
      .addMatcher(
        favoritesApi.endpoints.deleteFavorite.matchFulfilled,
        (state, action) => {
          state.favorites = state.favorites.filter(
            (device) => device.deviceId !== action.payload.deviceId
          );
        }
      );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
