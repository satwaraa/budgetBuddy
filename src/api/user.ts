import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "https://budgetbuddy-backend-next.vercel.app/api";
// const baseUrl = "http://192.168.158.211:8080/api";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include",
        async prepareHeaders(headers: Headers) {
            try {
                let accessToken = await AsyncStorage.getItem("accessToken");
                let refreshToken = await AsyncStorage.getItem("refreshToken");
                if (refreshToken) {
                    headers.set("refreshToken", refreshToken);
                }
                if (accessToken) {
                    headers.set("accessToken", accessToken);
                }
            } catch (error: any) {}
        },
    }),
    tagTypes: ["globalTypes", "refresh", "category", "groups"],
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials: any) => ({
                url: "/login",
                method: "POST",
                body: {...credentials},
            }),
        }),
        signup: builder.mutation({
            query: Credentials => ({
                url: "/signUp",
                method: "POST",
                body: {...Credentials},
            }),
        }),
        sayHello: builder.mutation({
            query: body => ({
                url: "/sayHello",
                method: "GET",
                body: body,
            }),
        }),
        getTransaction: builder.query({
            query: groupId => ({
                url: `/getTransaction/${groupId}`,
                method: "GET",
            }),
            providesTags: ["globalTypes", "refresh"],
        }),
        setTransaction: builder.mutation({
            query: body => ({
                url: "/setTransaction",
                method: "POST",
                body: {addTransaction: body},
            }),
            invalidatesTags: ["globalTypes"],
        }),
        getUser: builder.query({
            query: groupId => ({
                url: `/getUser/${groupId}`,
                method: "GET",
            }),
            providesTags: ["globalTypes", "refresh"],
        }),
        getCategory: builder.query({
            query: groupId => ({
                url: `/getCategory/${groupId}`,
                method: "GET",
            }),
            providesTags: ["category", "refresh", "globalTypes"],
        }),
        setCategory: builder.mutation({
            query: body => ({
                url: "/setCategory/",
                method: "POST",
                body: {setCategory: body},
            }),
            invalidatesTags: ["category"],
        }),
        refresh: builder.mutation({
            query: body => ({
                url: "/whoAmI",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["refresh"],
        }),
        logout: builder.mutation({
            query: body => ({
                url: "/logout",
                method: "POST",
                body: body,
            }),
        }),
        getGroups: builder.query({
            query: () => ({
                url: "/getGroups",
                method: "GET",
            }),
            providesTags: ["groups", "refresh"],
        }),
        createGroup: builder.mutation({
            query: body => ({
                url: "/createGroup",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["groups"],
        }),
        addFriend: builder.mutation({
            query: body => ({
                url: "/addFriend",
                method: "POST",
                body: body,
            }),
        }),
        getFriends: builder.query({
            query: () => ({
                url: "/getFriends",
                method: "GET",
            }),
        }),
        whoAmI: builder.query({
            query: () => ({
                url: "/whoAmI",
                method: "GET",
            }),
        }),
        resetGroup: builder.mutation({
            query: groupId => ({
                url: `/resetGroup`,
                method: "POST",
                body: {groupId: groupId},
            }),
            invalidatesTags: ["globalTypes"],
        }),
        setAvatar: builder.mutation({
            query: FormData => ({
                url: "/setAvatar",
                method: "POST",
                body: FormData,
                formdata: true,
            }),
        }),
        changePassword: builder.mutation({
            query: body => ({
                url: "/changePassword",
                method: "PATCH",
                body: body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLazyGetGroupsQuery,
    useSignupMutation,
    useSayHelloMutation,
    useLazyGetTransactionQuery,
    useLazyGetUserQuery,
    useLazyGetCategoryQuery,
    useSetTransactionMutation,
    useSetCategoryMutation,
    useRefreshMutation,
    useLogoutMutation,
    useCreateGroupMutation,
    useAddFriendMutation,
    useLazyGetFriendsQuery,
    useLazyWhoAmIQuery,
    useResetGroupMutation,
    useSetAvatarMutation,
    useChangePasswordMutation,
} = userApi;
