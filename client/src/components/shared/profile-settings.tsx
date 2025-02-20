import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@components/ui';
import { useUpdateUserMutation } from '@/services/user-api';

interface ProfileSettingsProps {
  defaultName: string;
  defaultSurname: string;
  defaultEmail: string;
  id: number;
}
export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  defaultEmail,
  defaultName,
  defaultSurname,
  id,
}) => {
  const [nameValue, setNameValue] = useState(defaultName);
  const [surnameValue, setSurnameValue] = useState(defaultSurname);
  const [emailValue, setEmailValue] = useState(defaultEmail);
  const [editProfile] = useUpdateUserMutation();
  const onEditProfile = async () => {
    const form = new FormData();
    form.append('name', nameValue);
    form.append('surname', surnameValue);
    form.append('email', emailValue);
    try {
      await editProfile({ id, body: form }).unwrap();
      toast.success('Вы успешно изменили профиль');
    } catch (error) {
      setNameValue(defaultName);
      setSurnameValue(defaultSurname);
      setEmailValue(defaultEmail);
      toast.error((error as any).data.message);
    }
  };
  return (
    <div className="bg-gray-200 p-10 rounded-md">
      <div className="text-2xl mb-10">Настройки профиля</div>
      <label htmlFor="name" className="">
        Имя
      </label>
      <input
        type="text"
        name="name"
        placeholder="Имя"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNameValue(e.target.value)
        }
        className="bg-white px-4 py-2 w-70 block mt-2 mb-4"
        value={nameValue}
      />
      <label htmlFor="surname" className="">
        Фамилия
      </label>
      <input
        type="text"
        name="surname"
        placeholder="Фамилия"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSurnameValue(e.target.value)
        }
        className="bg-white px-4 w-70 py-2  mt-2  block mb-4"
        value={surnameValue}
      />
      <label htmlFor="email" className="">
        Почта
      </label>
      <input
        name="email"
        type="text"
        placeholder="E-mail"
        value={emailValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmailValue(e.target.value)
        }
        className="bg-white px-4 w-70 py-2 mt-2 block mb-4"
      />
      <Button
        fz="normal"
        disabled={!nameValue || !surnameValue || !emailValue}
        onClick={onEditProfile}
      >
        Сохранить
      </Button>
    </div>
  );
};
