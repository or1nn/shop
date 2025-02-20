import { IDevice } from '../models/IDevice';
import { api } from './api';

export const favoritesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addFavorite: builder.mutation<{id: number, userId: number, deviceId: number, device: IDevice}, number>({
      query: (id) => ({
        url: '/favorites',
        method: 'POST',
        body: {deviceId: id},
      }),
      invalidatesTags: ['Device']
    }),
    deleteFavorite: builder.mutation<{id: number, userId: number, deviceId: number, device: IDevice}, number>({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Device']
    }),
  }),
});

export const { useAddFavoriteMutation, useDeleteFavoriteMutation } =
  favoritesApi;
