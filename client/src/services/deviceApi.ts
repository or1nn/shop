import { IDevice } from '../models/IDevice';
import { ICategory } from '../models/ICategory';
import { api } from './api';

export const deviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDevices: builder.query<IDevice[], string>({
      query: () => `/device`,
    }),
    getDeviceById: builder.query<IDevice, string>({
      query: (id) => `/device/${id}`,
    }),
    getAllCategories: builder.query<ICategory[], string>({
      query: () => '/type',
    }),
  }),
});

export const { useGetAllDevicesQuery, useGetAllCategoriesQuery, useGetDeviceByIdQuery } = deviceApi;
