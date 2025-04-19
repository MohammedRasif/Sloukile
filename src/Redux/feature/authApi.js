

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.10.131:4000/api/v1", // ✅ Update this with your backend URL
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/accounts/signup/", // ✅ Your API endpoint
                method: "POST",
                body: data, // ✅ Sending email & password
            }),
        }),

        registerVerification: builder.mutation({
            query: (data) => ({
                url: "/accounts/activate/",
                method: "POST",
                body: data,
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/accounts/login/",
                method: "POST",
                body: data,
            })
        }),

        forgetPassword: builder.mutation({
            query: (data) => ({
                url: "/accounts/password/request-reset/",
                method: "POST",
                body: data,
            })
        }),

        forgetpasswordVerification: builder.mutation({
            query: (data) => ({
                url: "/accounts/password/verify-otp/",
                method: "POST",
                body: data,
            })
        }),
        forgetRecentVerification: builder.mutation({
            query: (data) => ({
                url: "/accounts/resend-otp/",
                method: "POST",
                body: data,
            })
        }),
        confrimPassword: builder.mutation({
            query: (data) => ({
                url: "/accounts/password/reset/",
                method: "POST",
                body: data,
            })
        }),
    }),
});

// ✅ Destructure the auto-generated hook
export const { useRegisterMutation, useRegisterVerificationMutation, useLoginMutation, useForgetPasswordMutation, useForgetpasswordVerificationMutation, useConfrimPasswordMutation, useForgetRecentVerificationMutation } = authApi;
export default authApi;
