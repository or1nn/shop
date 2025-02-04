import { IReview } from '../models/IReview';
import { api } from './api';

export const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation<
      IReview,
      { content: string; rate: number; deviceId: number }
    >({
      query: ({ content, rate, deviceId }) => ({
        url: `/review/${deviceId}`,
        method: 'POST',
        body: { body: content, rate },
      }),
      invalidatesTags: ['Review'],
    }),
    deleteReview: builder.mutation<void, { deviceId: number }>({
      query: ({ deviceId }) => ({
        url: `/review/${deviceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const { useAddReviewMutation, useDeleteReviewMutation } = reviewApi;
