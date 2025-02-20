import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { AuthGuard } from './auth-guard';
import { store } from '@/store';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthGuard>{children}</AuthGuard>
    </Provider>
  );
};
