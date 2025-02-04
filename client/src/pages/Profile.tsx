import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { BASE_URL } from '../utils/constants';
import { ChangeEvent, useRef } from 'react';
import { toast } from 'react-toastify';
import { logout } from '../store/userSlice';
import { useUpdateUserMutation } from '../services/userApi';
import { Button } from '../components/ui/Button';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClickLogoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };
  const inputFileRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.user.current);
  const [updateUser] = useUpdateUserMutation();
  const onChangeAvatarHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const newAvatar = e.target.files?.[0];
    const formdata = new FormData();
    if (newAvatar) {
      formdata.append('avatar', newAvatar);
    }
    try {
      if (user) {
        await updateUser({ body: formdata, id: user.id }).unwrap();
        toast.success('Вы успешно изменили профиль');
      }
    } catch (error) {
      toast.error('Не удалось загрузить фото');
    }
  };
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
            <Button fz="normal" onClick={onClickLogoutHandler}>
              Выйти
            </Button>
          </div>
          <div>
            <div className="w-40 h-40 rounded-xl flex flex-col items-center justify-center">
              <div className="w-40 h-40 mb-2">
                <img
                  className="rounded-full w-40 h-40 object-cover"
                  src={`${BASE_URL}/uploads/avatars/${user?.avatar}`}
                  alt="avatar"
                />
              </div>
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
          <Button fz="normal">Сохранить</Button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
