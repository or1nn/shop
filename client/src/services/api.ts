import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { BASE_URL } from '../utils/constants';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})
