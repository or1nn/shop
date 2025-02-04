import { User } from '../store/user/types';

export const setDataLS = (user: User, token: string) => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      user,
      token,
    })
  );
};
