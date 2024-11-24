import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}`,
        credentials: "include", // Include credentials globally
    }),
    tagTypes: ["Chat"], // Define tags for cache management
    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "/chat/mychats",
            }),
            providesTags: ["Chat"], // Attach "Chat" tag to this query
        }),
    }),
});

export default api;
export const { useMyChatsQuery } = api; // Export hooks
