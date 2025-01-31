import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import cartReducer from './cart/slice';
import { api } from '../services/api';
export const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
