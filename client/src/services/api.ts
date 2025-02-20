import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,

  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem('token');
    headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  tagTypes: ['User', 'Device', 'Review'],
  endpoints: () => ({}),
});
