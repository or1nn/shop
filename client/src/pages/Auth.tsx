import { useState, MouseEvent } from 'react';
import { useInput } from '../hooks/useInput';
import { FormInput } from '../components/ui/FormInput';
import { useAppSelector } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation, useLoginMutation } from '../services/userApi';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/Button';

const Auth = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const name = useInput('', { isEmpty: true, minLength: 3 });
  const surname = useInput('', { isEmpty: true, minLength: 3 });
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 6 });
  const confirmPassword = useInput('', {
    isEmpty: true,
    minLength: 6,
    isConfirmPass: password.value,
  });
  if (isAuth) {
    navigate('/');
  }
  const onChangeTypeAuth = (e: MouseEvent) => {
    e.preventDefault();
    setIsRegister((state) => !state);
  };
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const onSubmitFormHandler = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register({
          email: email.value,
          password: password.value,
          name: name.value,
          surname: surname.value,
        }).unwrap();
        setIsRegister(false);
        toast.success('Вы успешно зарегистрировались');
      } else {
        await login({ email: email.value, password: password.value }).unwrap();
        toast.success('Вы успешно вошли');
      }
    } catch (error) {
      toast.error((error as any).data.message);
    }
  };

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-center text-2xl font-medium mb-4">
        {isRegister ? 'Регистрация' : 'Авторизация'}
      </h2>
      <form className="flex flex-col items-center">
        {isRegister && (
          <>
            <FormInput
              isDirty={name.isDirty}
              errorMessage={name.errorMessage}
              value={name.value}
              onChange={name.onChange}
              onBlur={name.onBlur}
              placeholder="Введите имя"
            />
            <FormInput
              isDirty={surname.isDirty}
              errorMessage={surname.errorMessage}
              value={surname.value}
              onChange={surname.onChange}
              onBlur={surname.onBlur}
              placeholder="Введите фамилию"
            />
          </>
        )}
        <FormInput
          isDirty={email.isDirty}
          errorMessage={email.errorMessage}
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          placeholder="Введите E-Mail"
        />
        <FormInput
          isDirty={password.isDirty}
          errorMessage={password.errorMessage}
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          type="password"
          placeholder="Введите пароль"
        />
        {isRegister && (
          <FormInput
            isDirty={confirmPassword.isDirty}
            errorMessage={confirmPassword.errorMessage}
            value={confirmPassword.value}
            onChange={confirmPassword.onChange}
            onBlur={confirmPassword.onBlur}
            type="password"
            placeholder="Повтор пароля"
          />
        )}

        <Button
        fz='normal'
          onClick={onSubmitFormHandler}
          disabled={
            isRegister
              ? !email.inputValid ||
                !password.inputValid ||
                !confirmPassword.inputValid ||
                !name.inputValid ||
                !surname.inputValid
              : !email.inputValid || !password.inputValid
          }
          className="bg-blue-500 w-100 py-2 rounded-xl mb-4 text-white cursor-pointer disabled:bg-gray-500 disabled:cursor-default"
        >
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </Button>
        <label>
          {isRegister ? 'Есть аккаунт? ' : 'Нет акккаунта? '}
          <button
            className="text-blue-500 cursor-pointer"
            onClick={onChangeTypeAuth}
          >
            {isRegister ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </label>
      </form>
    </div>
  );
};
export default Auth;
