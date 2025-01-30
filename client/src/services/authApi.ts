import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: '/login',
          method: 'POST',
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: { name: string; surname: string; email: string; password: string }) => {
        return {
          url: '/registration',
          method: 'POST',
          body,
        };
      },
    }),
    currentUser: builder.query({
      query: (body: { token: string }) => {
        return {
          url: '/current'
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useCurrentUserQuery } = authApi;
