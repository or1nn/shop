import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout, setNewAvatar } from '../store/user/slice';
import { BASE_URL } from '../utils/constants';
import { useChangeUserAvatarMutation } from '../services/userApi';
import { ChangeEvent, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClickLogoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };
  const inputFileRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.user.user);
  const [changeAvatar, { data, isLoading, isSuccess, error }] =
    useChangeUserAvatarMutation();
  const onChangeAvatarHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const newAvatar = e.target.files?.[0];
    const formdata = new FormData();
    if (newAvatar) {
      formdata.append('avatar', newAvatar);
    }
    await changeAvatar(formdata);
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setNewAvatar({ avatar: data.user.avatar, token: data.token }));
      toast.success('Аватарка обновлена!');
    }
    if (error) {
      toast.error('Не удалось загрузить аватарку');
    }
  }, [isLoading]);
  return (
    <div className="container mx-auto ">
      <h2 className="font-bold text-3xl mb-5">Профиль</h2>
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-gray-200 p-10 grid grid-cols-[1fr_160px] rounded-md">
          <div>
            <div className="text-2xl ">{user?.name}</div>
            <div className="text-2xl mb-2">{user?.surname}</div>
            <div className="mb-5 text-gray-700">
              Статус: {user?.role === 'BUYER' ? 'Покупатель' : 'Администратор'}
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
              onClick={onClickLogoutHandler}
            >
              Выйти
            </button>
          </div>
          <div>
            <div className="w-40 h-40 rounded-xl flex flex-col items-center justify-center">
              <img
                className="rounded-full w-40 h-40 object-cover mb-2"
                src={`${BASE_URL}/uploads/avatars/${user?.avatar}`}
                alt="avatar"
              />
              <input
                ref={inputFileRef}
                onChange={onChangeAvatarHandler}
                type="file"
                className="hidden"
              />
              <button
                onClick={() => inputFileRef.current?.click()}
                className="cursor-pointer text-blue-500 font-medium"
              >
                Изменить фото
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-10 rounded-md">
          <div className="text-2xl ">Заказы</div>
        </div>
        <div className="bg-gray-200 p-10 rounded-md">
          <div className="text-2xl mb-10">Настройки профиля</div>
          <input
            type="text"
            placeholder="Имя"
            className="bg-white px-4 py-2 w-70 block mb-4"
            value={user?.name}
          />
          <input
            type="text"
            placeholder="Фамилия"
            className="bg-white px-4 w-70 py-2 block mb-4"
            value={user?.surname}
          />
          <input
            type="text"
            placeholder="E-mail"
            value={user?.email}
            className="bg-white px-4 w-70 py-2 block mb-4"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
