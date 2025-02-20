import { useEffect, useState } from 'react';

export interface IValidations {
  isEmail?: boolean;
  minLength: number;
  isEmpty: boolean;
  isConfirmPass?: string;
}

export const useValidation = (value: string, validations: IValidations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isConfrimError, setIsConfrimError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          if (value.length < validations[validation]) {
            setMinLengthError(true);
            setErrorMessage(
              `Минимальная длина поля ${validations[validation]} символов`
            );
          } else {
            setMinLengthError(false);
          }
          break;
        case 'isEmpty':
          if (value) {
            setEmpty(false);
          } else {
            setEmpty(true);
            setErrorMessage(`Поле не должно быть пустым`);
          }
          break;
        case 'isConfirmPass':
          if (value === validations[validation]) {
            setIsConfrimError(false);
          } else {
            setIsConfrimError(true);
            setErrorMessage(`Пароли не совпадают`);
          }
          break;
        case 'isEmail':
          if (
            value.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ) {
            setIsEmailError(false);
          } else {
            setIsEmailError(true);
            setErrorMessage(`Введен некорректный E-Mail`);
          }
          break;
      }
    }
  }, [value, validations['isConfirmPass']]);
  useEffect(() => {
    if (isEmailError || isEmpty || minLengthError || isConfrimError) {
      setInputValid(false);
    } else {
      setInputValid(true);
      setErrorMessage('');
    }
  }, [isEmpty, isEmailError, minLengthError, isConfrimError]);
  return {
    inputValid,
    isEmpty,
    minLengthError,
    isEmailError,
    errorMessage,
    isConfrimError,
  };
};
