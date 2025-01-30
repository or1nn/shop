import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Modal } from './Modal';
import { useLoginUserMutation } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from '../../store/user/slice';

interface LoginModalProps {
  active: boolean;
  setActive: (state: boolean) => void;
  toggle: () => void;
}

const initialState = {
  email: '',
  password: '',
};

export const LoginModal: React.FC<LoginModalProps> = ({
  active,
  setActive,
  toggle,
}) => {
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const [loginUser, { data, isSuccess, isError, error }] =
    useLoginUserMutation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    if (email && password) {
      await loginUser({ email, password });
    } else {
      alert('заполните все поля');
    }
  };
  useEffect(() => {
    if (isSuccess) {
      alert('вы успешно вошли!');
      dispatch(setUser({token: data.token, user: data.user}))
      setActive(false);
    }
  }, [isSuccess]);
  return (
    <Modal active={active} setActive={setActive}>
      <form className="flex flex-col items-center">
        <h2 className="text-2xl mb-5">Вход</h2>
        <input
          className="py-2 px-4 outline-1 rounded-md mb-4 outline-[#c5c5c5]"
          type="email"
          placeholder="E-Mail"
          onChange={handleChange}
          value={email}
          name="email"
        />
        <input
          className="py-2 px-4 outline-1 rounded-md mb-4 outline-[#c5c5c5]"
          type="password"
          onChange={handleChange}
          placeholder="Пароль"
          value={password}
          name="password"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-20 rounded-md mb-2"
        >
          Войти
        </button>
      </form>
      <span>
        Нет аккаунта?{' '}
        <span className="text-blue-500 cursor-pointer" onClick={toggle}>
          Регистрация
        </span>
      </span>
    </Modal>
  );
};
