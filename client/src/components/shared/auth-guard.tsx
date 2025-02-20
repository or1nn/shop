import { useCurrentQuery } from '@/services/user-api';
import { PropsWithChildren } from 'react';

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useCurrentQuery();
  if (isLoading) {
    return <div>...</div>;
  }
  return children;
};
