import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "../redux/userSlice";

let baseUrl =
  process.env.REACT_APP_API_BASE_URL || "https://blog-app-plfx.onrender.com";

export const userApis = createApi({
  reducerPath: "userApis",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
    }),

    verifyUser: builder.mutation({
      query: (verificationData) => ({
        url: `/users/verify`,
        method: "PUT",
        body: verificationData,
      }),
    }),

    getCurrentUser: builder.mutation({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Set the current user in the Redux store
          dispatch(setCurrentUser(data?.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useVerifyUserMutation,
  useGetCurrentUserMutation,
} = userApis;
