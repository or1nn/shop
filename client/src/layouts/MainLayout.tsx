import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
    </>
  );
};
export default MainLayout;
