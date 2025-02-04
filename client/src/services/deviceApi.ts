import { IDevice } from '../models/IDevice';
import { ICategory } from '../models/ICategory';
import { api } from './api';

export const deviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDevices: builder.query<
      IDevice[],
      { search: string; categoryId?: number | null }
    >({
      query: ({ search, categoryId }) =>
        categoryId
          ? `/device?search=${search}&categoryId=${categoryId}&sortBy=0`
          : `/device?search=${search}&sortBy=0`,
      providesTags: () => ['Device'],
    }),
    getAllDevicesByCategory: builder.query<
      IDevice[],
      { search: string; categoryId: number; sortBy: number; order: string }
    >({
      query: ({ search, categoryId, sortBy, order }) =>
        `/device?search=${search}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}`,
      providesTags: () => ['Device'],
    }),
    getDeviceById: builder.query<IDevice, string>({
      query: (id) => `/device/${id}?search=`,
      providesTags: () => ['Review']
    }),
    getAllCategories: builder.query<ICategory[], string>({
      query: () => '/category',
    }),
  }),
});

export const {
  useGetAllDevicesQuery,
  useGetAllCategoriesQuery,
  useGetDeviceByIdQuery,
  useLazyGetAllDevicesQuery,
  useGetAllDevicesByCategoryQuery,
} = deviceApi;
