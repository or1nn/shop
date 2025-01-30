import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import cartReducer from './cart/slice';
import { deviceApi } from '../services/storeService';
import { authApi } from '../services/authApi';
export const store = configureStore({
  reducer: {
    user: userReducer,
    [deviceApi.reducerPath]: deviceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deviceApi.middleware).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
