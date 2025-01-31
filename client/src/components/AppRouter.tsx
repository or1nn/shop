import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { authRoutes, publicRoutes } from '../utils/routes';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        {isAuth &&
          authRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;
