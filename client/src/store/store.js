import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { blogApis } from "../lib/APIs/blogApis";
import { userApis } from "../lib/APIs/userApis";
import { authApis } from "../lib/APIs/authApis";
import userSlice from "../lib/redux/userSlice";

export const store = configureStore({
  reducer: {
    [blogApis.reducerPath]: blogApis.reducer,
    [userApis.reducerPath]: userApis.reducer,
    [authApis.reducerPath]: authApis.reducer,
    userState: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApis.middleware,
      userApis.middleware,
      authApis.middleware
    ),
});

setupListeners(store.dispatch);
