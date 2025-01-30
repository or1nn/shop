import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDevice } from '../models/IDevice';
import { ICategory } from '../models/ICategory';

export const deviceApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    getAllDevices: builder.query<IDevice[], string>({
      query: () => `device`,
    }),
    getAllCategories: builder.query<ICategory[], string>({
      query: () => 'type',
    }),
  }),
});

export const { useGetAllDevicesQuery, useGetAllCategoriesQuery } = deviceApi;
