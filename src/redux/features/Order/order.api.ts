// orderApi.ts - Simplified (no cart endpoints needed)
import { baseApi } from "@/redux/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/create",
        method: "POST",
        data: orderData,
      }),
      invalidatesTags: ["ORDER"],
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/order/all-orders",
        method: "GET",
     
      }),
      providesTags: ["ORDER"],
      transformResponse: (response) => response.data,
    }),
    // No cart endpoints needed - cart is frontend only
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
} = orderApi;