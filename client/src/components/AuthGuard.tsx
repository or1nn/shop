import { useCurrentQuery } from '../services/userApi';

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();
  if (isLoading) {
    return <div>...</div>;
  }
  return children;
};
