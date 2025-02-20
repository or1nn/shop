import { ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout } from '@/store/user-slice';
import { useUpdateUserMutation } from '../services/user-api';
import { BASE_URL } from '@/services/api';
import { Button, ProfileSettings } from '@/components';

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
    <div className="container mx-auto pt-2">
      <h2 className="font-medium text-2xl mb-4">Профиль</h2>
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
        <div className="bg-gray-200 p-10 rounded-md col-start-2 row-start-1 row-end-3 ">
          <div className="text-2xl ">Заказы</div>
          <div className="text-center text-xl pt-50">
            Вы еще не совершали покупок
          </div>
        </div>
        <ProfileSettings
          defaultName={user!.name}
          defaultSurname={user!.surname}
          defaultEmail={user!.email}
          id={user!.id}
        />
      </div>
    </div>
  );
};
export default Profile;
