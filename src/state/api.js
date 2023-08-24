import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "OnSaleCattle",
    "Staff",
    "Employee",
    "AddProduct",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getOnSaleCattle: build.query({
      query: () => `onsalecattle/onsalecattle/`,
      providesTags: ["OnSaleCattle"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetOnSaleCattleQuery,
} = api;
