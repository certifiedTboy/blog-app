import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let baseUrl =
  process.env.REACT_APP_API_BASE_URL || "https://blog-app-plfx.onrender.com";

export const blogApis = createApi({
  reducerPath: "blogApis",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    getAllBlogs: builder.mutation({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
    }),

    getBlogById: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBlogsMutation, useGetBlogByIdMutation } = blogApis;
