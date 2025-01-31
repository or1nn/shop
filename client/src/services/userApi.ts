import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: '/user/login',
          method: 'POST',
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: {
        name: string;
        surname: string;
        email: string;
        password: string;
      }) => {
        return {
          url: '/user/registration',
          method: 'POST',
          body,
        };
      },
    }),
    changeUserAvatar: builder.mutation({
      query: (body: FormData) => {
        return {
          url: '/user/newAvatar',
          method: 'POST',
          body,
        };
      },
    }),
    currentUser: builder.query({
      query: () => {
        return {
          url: '/user/current',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useCurrentUserQuery,
  useChangeUserAvatarMutation,
} = authApi;
