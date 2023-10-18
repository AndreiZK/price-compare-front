import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ReviewData {
  authorId: string | number;
  content: string;
  productName: string;
}

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterData) => ({
        url: "auth/register",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    }),
    login: builder.mutation({
      query: (data: LoginData) => ({
        url: "auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    }),
    comparePrices: builder.query({
      query: (keyword: string) => `comparePrices?keyword=${keyword}`,
    }),
    listReviews: builder.query({
      query: (productName: string) => `reviews?productName=${productName}`,
    }),
    addReview: builder.mutation({
      query: (data: ReviewData) => ({
        url: "reviews/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyComparePricesQuery,
  useLazyListReviewsQuery,
  useAddReviewMutation,
} = api;
export default api;
