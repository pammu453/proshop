import { ORDERS_URL,PAYPAL_URL } from "../constants";
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
        payOrder: builder.mutation({
            query: ({orderId,details}) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: "PUT",
                body:{...details},
                credentials: 'include',
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
                credentials: 'include'
            }),
            keepUnusedDataFor:5
        }),
    })
})

export const { 
    useCreateOrderMutation,
    useGetOrderDetailsQuery ,
    usePayOrderMutation,
    useGetPayPalClientIdQuery
} = orderApiSlice