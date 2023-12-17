import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
                credentials: 'include',
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
                credentials: 'include',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
                credentials: 'include',
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                credentials: 'include',
                body: data
            }),
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation
} = usersApiSlice