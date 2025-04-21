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
        userProject: builder.query({
            query: () => ({
                url: "/main/projects/",
                method: "GET"
            }),
            providesTags: ["userDashboard"],
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true
        }),


        // Delete Question
        userDeleteProject: builder.mutation({
            query: (id) => ({
                url: `/main/projects/${id}/delete/`,
                method: "DELETE"
            }),
            invalidatesTags: ["project"]
        }),


        userProjectDetails: builder.query({
            query: (id) => ({
                url: `/main/projects/${id}/`,
                method: "GET",
            }),
            providesTags: ["project"],
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true,
        }),


        userProjectCreate: builder.mutation({
            query: (data) => ({
                url: "/main/projects/create/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["createProject"]
        }),



        userEditProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `/main/projects/${id}/update/`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["createProject"]
        }),



        userCreateTeam: builder.mutation({
            query: (data) => ({
                url: "/main/employees/create/",
                method: "POST",
                body: data
            })
        }),

        userTeamManagement: builder.mutation({
            query: () => ({
                url: "/main/employees/",
                method: "GET",

            }),
            providesTags: ["employees data"],
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true
        }),


         // Delete Question
         userTeamDelete: builder.mutation({
            query: (id) => ({
                url: `/main/employees/${id}/delete/`,
                method: "DELETE"
            }),
            invalidatesTags: ["Team"]
        }),


        userEditTeam: builder.mutation({
            query: ({ id, data }) => ({
                url: `/main/employees/${id}/update/`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["createProject"]
        }),


    }),
});


// Export hooks for usage in components
export const { useGetProfileQuery, useUserdashboardQuery, useUserProjectQuery, useUserDeleteProjectMutation, useUserProjectDetailsQuery, useUserProjectCreateMutation, useUserEditProjectMutation, useUserTeamManagementMutation , useUserCreateTeamMutation, useUserTeamDeleteMutation, useUserEditTeamMutation } = ApiSlice;

export default ApiSlice;

