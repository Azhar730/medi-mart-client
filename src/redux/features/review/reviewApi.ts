import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),
    createReview: builder.mutation({
      query: (payload) => ({
        url: "/reviews/create-review",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});
export const { useCreateReviewMutation, useGetAllReviewQuery } = reviewApi;
