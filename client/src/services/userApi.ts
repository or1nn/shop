import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
    register: builder.mutation<
      { email: string; password: string },
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: '/registration',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});
