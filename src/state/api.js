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
    "signup",
    "SpecificOnSaleCattle",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => ({ url: `user/fetchid`, method: "GET", body: id }),
      providesTags: ["User"],
    }),
    getUserId: build.query({
      query: (id) => ({ url: `user/`, method: "GET", body: id }),
      providesTags: ["User"],
    }),
    getOnSaleCattle: build.query({
      query: () => `onsalecattle/`,
      providesTags: ["OnSaleCattle"],
    }),

    getSpecificOnSaleCattle: build.query({
      query: (id) => `onsalecattle/specificonsalecattle/${id}`,
      providesTags: ["SpecificOnSaleCattle"],
    }),
    createUser: build.mutation({
      query: (firstName, lastName, newEmail, password, passwordVerify) => ({
        url: "user/signup/",
        method: "POST",
        body: firstName,
        lastName,
        newEmail,
        password,
        passwordVerify,
      }),
      providesTags: ["signup"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetOnSaleCattleQuery,
  useGetSpecificOnSaleCattleQuery,
  useCreateUserMutation,
  useGetUserIdQuery,
} = api;
