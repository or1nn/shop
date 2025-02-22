import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import cartReducer from './cart-slice';
import { api } from '../services/api';
import { listenerMiddleware } from '../middleware/auth';
import filterReducer from './filter-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
