import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.10.153:8081/api",
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem("accessToken")
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
    tagTypes: ["question", "addQuestion", "Admin", "Copun", "subscrption"],
    endpoints: (builder) => ({

        // Create Question
        createQuestion: builder.mutation({
            query: (data) => ({
                url: "/question/section/create/admin/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["question"]
        }),

        // Get Question
        getQuestion: builder.query({
            query: () => ({
                url: "/question/section/list/with-added-q/admin/",
                method: "GET"
            }),
            providesTags: ["question"],
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true
        }),

        // Edit Question
        editQuestion: builder.mutation({
            query: ({ id, question }) => ({
                url: `/question/section/${id}/admin/`,
                method: "PATCH",
                body: question
            }),
            invalidatesTags: ["question"]
        }),

        // Delete Question
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/question/section/${id}/admin/`,
                method: "DELETE"
            }),
            invalidatesTags: ["question"]
        }),

        // Get Question Data
        getQuestionData: builder.query({
            query: (id) => ({
                url: `/question/list/admin/?section=${id}`,
                method: "GET",
            }),
            providesTags: ["question"],
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true
        }),

        // Create Question Section
        createQuestionSetion: builder.mutation({
            query: (addQuestion) => ({
                url: "/question/create/admin/",
                method: "POST",
                body: addQuestion
            }),
            invalidatesTags: ["question"]
        }),

        // Delete Question Section
        deleteQuestionSection: builder.mutation({
            query: (id) => ({
                url: `/question/${id}/admin/`,
                method: "DELETE",
            }),
            invalidatesTags: ["question"]
        }),

        // Edit Question Section
        editQuestionSection: builder.mutation({
            query: ({ id, question }) => ({
                url: `/question/${id}/admin/`,
                method: "PATCH",
                body: question
            }),
            invalidatesTags: ["question"]
        }),

        // Show admin data (GET)
        adminData: builder.query({
            query: () => ({
                url: "/admin-user/list/admin/",
                method: "GET",
            }),
            providesTags: ["Admin"], // 👈 Keeps cache updated
        }),

        // Create admin data (POST)
        createAdminData: builder.mutation({
            query: (addAdmin) => ({
                url: "/admin-user/create/admin/",
                method: "POST",
                body: addAdmin,
            }),
            invalidatesTags: ["Admin"],
        }),

        // Delete admin data (DELETE)
        deleteAdminData: builder.mutation({
            query: (id) => ({
                url: `/admin-user/${id}/admin/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Admin"], // 👈 Auto refetch after delete
        }),


        // create Coupon
        createCupon: builder.mutation({
            query: (AddCopun) => ({
                url: "/order/coupon/admin/",
                method: "POST",
                body: AddCopun,
            }),
            invalidatesTags: ["Copun"]
        }),

        // show coupon
        cuponData: builder.query({
            query: () => ({
                url: "/order/coupon/admin/",
                method: "GET"
            }),
            providesTags: ["Copun"]
        }),

        // delete coupon
        cuponDelete: builder.mutation({
            query: (id) => ({
                url: `/order/coupon/${id}/admin/`,
                method: "DELETE"
            }),
            invalidatesTags: ["Copun"]
        }),
        // edit coupon
        eidtCupon: builder.mutation({
            query: ({ id, updatedCoupon }) => ({
                url: `/order/coupon/${id}/admin/`,
                method: "PATCH",
                body: updatedCoupon
            }),
            invalidatesTags: ["Copun"]
        }),

        //Teramsssssss
        Setting: builder.query({
            query: () => ({
                url: "/company/info/public/",
                method: "GET"
            }),
            providesTags: ["setting"]
        }),

        // upadate settting
        editSetting: builder.mutation({
            query: (updateSetting) => ({
                url: "/company/info/update/admin/",
                method: "PATCH",
                body: updateSetting
            }),
            invalidatesTags: ["setting"]
        }),

        //create subcription
        createSubcription: builder.mutation({
            query: (AddSubcription) => ({
                url: "/subscription/create/admin/",
                method: "POST",
                body: AddSubcription
            }),
            invalidatesTags: ["subcription"]
        }),

        // show subcription
        subscriptionData: builder.query({
            query: () => ({
                url: "/subscription/list/admin/",
                method: "GET"
            }),
            providesTags: ["subcription"]
        }),

        // edite subsctipion
        editsubcription: builder.mutation({
            query: ({ id, updateSubcription }) => ({
                url: `/subscription/${id}/admin/`,
                method: "PATCH",
                body: updateSubcription
            }),
            invalidatesTags: ["subcription"]
        }),

        // delete subscription
        deleteSubcription: builder.mutation({
            query: (id) => ({
                url: `/subscription/${id}/admin/`,
                method: "DELETE"
            }),
            invalidatesTags: ["subscrption"]
        }),

        subscribeData: builder.query({
            query: (subscriptionType) => ({
                url: `/subscriber/list/admin/?subscriber=${subscriptionType}`,
                method: "GET",
            }),
            providesTags: ["subcriber"]
        }),

        adminProfileData: builder.query({
            query: () => ({
                url: "/user/profile/details/",
                method: "GET"
            }),
            providesTags: ["AdminProfileData"]
        }),

        editAdminProfileData: builder.mutation({
            query: (updateAdminProfile) => ({
                url: "/user/profile/update/",
                method: "PATCH",
                body: updateAdminProfile
            }),
            invalidatesTags: ["AdminProfileData"]
        })


    }),
});


// Export hooks for usage in components
export const { useCreateQuestionMutation, useGetQuestionQuery, useEditQuestionMutation, useDeleteQuestionMutation, useGetQuestionDataQuery, useCreateQuestionSetionMutation, useDeleteQuestionSectionMutation, useEditQuestionSectionMutation, useAdminDataQuery, useCreateAdminDataMutation, useDeleteAdminDataMutation, useCreateCuponMutation, useCuponDataQuery, useCuponDeleteMutation, useEidtCuponMutation, useSettingQuery, useCreateSubcriptionMutation, useSubscriptionDataQuery, useEditsubcriptionMutation, useDeleteSubcriptionMutation, useEditSettingMutation, useSubscribeDataQuery, useAdminProfileDataQuery, useEditAdminProfileDataMutation } = ApiSlice;

export default ApiSlice;

