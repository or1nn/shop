import { IUser } from '../models/IUser';
import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: '/user/login',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (body: {
        name: string;
        surname: string;
        email: string;
        password: string;
      }) => {
        return {
          url: '/user/register',
          method: 'POST',
          body,
        };
      },
    }),
    updateUser: builder.mutation<IUser, { body: FormData; id: number }>({
      query: ({ body, id }) => {
        return {
          url: `/user/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['User']
    }),
    current: builder.query<IUser, void>({
      query: () => {
        return {
          url: '/user/current',
          method: 'GET',
        };
      },
      providesTags: () => ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyCurrentQuery,
  useCurrentQuery,
  useUpdateUserMutation,
} = userApi;
