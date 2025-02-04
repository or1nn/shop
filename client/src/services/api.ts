import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { RootState } from '../store/store';

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
