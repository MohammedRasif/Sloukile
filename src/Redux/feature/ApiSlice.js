import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.10.131:4000/api/v1",
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem("access_token")
        console.log(accessToken);
        const token = getState().auth.token || accessToken
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
});

export const ApiSlice = createApi({
    reducerPath: "ApiSlice",
    baseQuery,
    tagTypes: ["profile",],
    endpoints: (builder) => ({

        // // Create Question
        // createQuestion: builder.mutation({
        //     query: (data) => ({
        //         url: "/question/section/create/admin/",
        //         method: "POST",
        //         body: data
        //     }),
        //     invalidatesTags: ["question"]
        // }),

        // Get Question

        getProfile: builder.query({
            query: () => ({
                url: "/accounts/profile/",
                method: "GET"
            }),
            providesTags: ["profile"],
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true
        }),

        userdashboard: builder.query({
            query: () => ({
                url: "/main/dashboard/",
                method: "GET"
            }),
            providesTags: ["userDashboard"],
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true
        }),

        // // Edit Question
        // editQuestion: builder.mutation({
        //     query: ({ id, question }) => ({
        //         url: `/question/section/${id}/admin/`,
        //         method: "PATCH",
        //         body: question
        //     }),
        //     invalidatesTags: ["question"]
        // }),

        // // Delete Question
        // deleteQuestion: builder.mutation({
        //     query: (id) => ({
        //         url: `/question/section/${id}/admin/`,
        //         method: "DELETE"
        //     }),
        //     invalidatesTags: ["question"]
        // }),

        // // Get Question Data
        // getQuestionData: builder.query({
        //     query: (id) => ({
        //         url: `/question/list/admin/?section=${id}`,
        //         method: "GET",
        //     }),
        //     providesTags: ["question"],
        //     keepUnusedDataFor: 0,
        //     refetchOnMountOrArgChange: true
        // }),




    }),
});


// Export hooks for usage in components
export const { useGetProfileQuery, useUserdashboardQuery, } = ApiSlice;

export default ApiSlice;

