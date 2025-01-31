import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

interface userSliceState {
  isAuth: boolean;
  user: User | null;
  token: string | null;
}

const initialState: userSliceState = {
  isAuth: false,
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; token: string }>) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    setNewAvatar(state, action: PayloadAction<{avatar: string, token: string}>) {
      if (state.user) {
        state.user.avatar = action.payload.avatar;
        localStorage.removeItem('user');
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: {
              id: state.user.id,
              name: state.user.name,
              surname: state.user.surname,
              email: state.user.email,
              role: state.user.role,
              avatar: state.user.avatar,
            },
            token: action.payload.token,
          })
        );
      }
    },
    logout(state) {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logout, setNewAvatar } = userSlice.actions;
export default userSlice.reducer;
