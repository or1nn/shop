import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Modal } from './Modal';
import { useRegisterUserMutation } from '../../services/authApi';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from '../../store/user/slice';

interface RegisterModalProps {
  active: boolean;
  setActive: (state: boolean) => void;
  toggle: () => void;
}

const initialState = {
  email: '',
  name: '',
  surname: '',
  password: '',
  confirmPassword: '',
};

export const RegisterModal: React.FC<RegisterModalProps> = ({
  active,
  setActive,
  toggle,
}) => {
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, surname, password, confirmPassword } = formValue;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const [registerUser, { data, isSuccess, isError, error }] =
    useRegisterUserMutation();
  const onClickRegisterHandler = async (e: MouseEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Пароли не совпадают');
    }
    if (surname && name && password && email) {
      await registerUser({ name, surname, password, email });
    }
  };
  useEffect(() => {
    if(isSuccess) {
      toast.success('Вы успешно зарегистрировались!')
      dispatch(setUser({token: data.token, user: data.user}))
      setActive(false);
    }
  }, [isSuccess])
  return (
    <Modal active={active} setActive={setActive}>
      <form className="flex flex-col items-center">
        <h2 className="text-2xl mb-5">Регистрация</h2>
        <input
          className="py-2 px-4 outline-1 rounded-md mb-4 outline-[#c5c5c5]"
          type="text"
          placeholder="Имя..."
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          className="py-2 px-4 outline-1 rounded-md mb-4 outline-[#c5c5c5]"
          type="text"
          placeholder="Фамилия..."
          value={surname}
          name='surname'
          onChange={handleChange}
        />
        <input
          className="py-2 px-4 outline-1 rounded-md mb-4 outline-[#c5c5c5]"
          type="email"
          placeholder="E-Mail"
          value={email}
          name='email'
          onChange={handleChange}
        />
        <input
          className="py-2 px-4 outline-1 rounded-md mb-4 outline-[#c5c5c5]"
          type="password"
          onChange={handleChange}
          value={password}
          name='password'
          placeholder="Пароль"
        />
        <input
          className="py-2 px-4 outline-1 rounded-md mb-4 outline-[#c5c5c5]"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Подтвердите пароль"
        />
        <button
          onClick={onClickRegisterHandler}
          className="bg-blue-500 text-white py-2 px-8 rounded-md mb-2"
        >
          Зарегистироваться
        </button>
      </form>
      <span>
        Уже есть аккаунт?{' '}
        <span className="text-blue-500 cursor-pointer" onClick={toggle}>
          Войти
        </span>
      </span>
    </Modal>
  );
};
