import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token ||
      JSON.parse(localStorage.getItem('user') || '{}').token;
    headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});
