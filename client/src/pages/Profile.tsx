import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/user/slice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClickLogoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="container mx-auto text-center">
      <h2>{user?.name}</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
        onClick={onClickLogoutHandler}
      >
        Выйти
      </button>
    </div>
  );
};
export default Profile;
