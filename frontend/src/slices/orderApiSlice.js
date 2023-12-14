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
        })
    })
})

export const { useCreateOrderMutation } = orderApiSlice