import { IDevice } from '../models/IDevice';
import { ICategory } from '../models/ICategory';
import { api } from './api';
import { IBrand } from '../models/IBrand';

export const deviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDevices: builder.query<
      { devices: IDevice[]; totalPages: number; currentPage: number },
      {
        search: string;
        categoryId?: number;
        sortBy?: number;
        order?: string;
        brandId?: number;
        page: number;
      }
    >({
      query: ({ search, categoryId, sortBy, order, brandId, page }) =>
        `/device?search=${search}${
          categoryId ? `&categoryId=${categoryId}` : ''
        }${brandId ? `&brandId=${brandId}` : ''}&sortBy=${
          sortBy ? sortBy : 0
        }&order=${order ? order : 'asc'}&page=${page}`,
      providesTags: () => ['Device'],
    }),
    getHitDevices: builder.query<IDevice[], void>({
      query: () => '/device/hits',
      providesTags: () => ['Device'],
    }),
    getDeviceById: builder.query<IDevice, string>({
      query: (id) => `/device/${id}`,
      providesTags: () => ['Review'],
    }),
    getAllCategories: builder.query<ICategory[], void>({
      query: () => '/category',
    }),
    getAllBrands: builder.query<IBrand[], void>({
      query: () => '/brand',
    }),
  }),
});

export const {
  useGetAllDevicesQuery,
  useGetAllCategoriesQuery,
  useGetDeviceByIdQuery,
  useGetHitDevicesQuery,
  useGetAllBrandsQuery,
} = deviceApi;
