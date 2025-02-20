import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from '../shared';

export const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
    </>
  );
};
