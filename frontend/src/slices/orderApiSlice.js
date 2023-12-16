import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: ORDERS_URL,
                method: "POST",
                body:{...data},
                credentials: 'include',
            }),
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                credentials: 'include'
            }),
            keepUnusedDataFor:5
        }),
    })
})

export const { useCreateOrderMutation,useGetOrderDetailsQuery } = orderApiSlice