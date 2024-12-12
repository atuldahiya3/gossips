import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}`,
    credentials: "include", // Include credentials globally
  }),
  tagTypes: ["Chat", "User", "Notification", "Group", "Friends"], // Define tags for cache management
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "/chat/mychats",
      }),
      providesTags: ["Chat"], // Attach "Chat" tag to this query
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/searchUser?name=${name}`,
      }),
      providesTags: ["User"], // Attach "User" tag to this query
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/user/sendRequest`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      providesTags: ["User"], // Attach "User" tag to this query
    }),
    getNotification: builder.query({
      query: () => ({
        url: `/user/notifications`,
      }),
      providesTags: ["Notification"],
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/user/acceptRequest`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      providesTags: ["User", "Chat"], // Attach "User" tag to this query
    }),
    myGroups: builder.query({
      query: () => ({
        url: "/chat/mygroups",
      }),
      providesTags: ["Group"],
    }),
    myFriends: builder.query({
      query: () => ({
        url: "/user/friends",
      }),
      providesTags: ["Friends"],
    }),
    createGroup: builder.mutation({
        query: (data) => ({
          url: `/chat/new`,
          method: "POST",
          body: data,
          credentials: "include",
        }),
        providesTags: ["Group", "Chat"],
      }),
      renameGroup:builder.mutation({
        query:(groupId,data)=>({
            url:`chat/${groupId}`,
            method:"PUT",
            body:data,
            credentials:"include",
            headers: {
              "Content-Type": "application/json", // Optional if automatically added
            },
        }),
        providesTags: ["Group", "Chat"],
      })
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationQuery,
  useAcceptFriendRequestMutation,
  useMyGroupsQuery,
  useMyFriendsQuery,
  useCreateGroupMutation,
  useRenameGroupMutation
} = api; // Export hooks
