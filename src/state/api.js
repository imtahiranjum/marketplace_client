import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
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
    getProduct: build.query({
      query: () => `client/products/`,
      providesTags: ["Product"],
    }),
    setProduct: build.query({
      query: (data) => `client/addProduct`,
      providesTags: ["AddProduct"],
    }),
    getStaff: build.query({
      query: () => `client/staff/`,
      providesTags: ["Staff"],
    }),
    getDoctor: build.query({
      query: () => `client/doctors/`,
      providesTags: ["Doctor"],
    }),
    getEmployee: build.query({
      query: (id) => `client/staff/${id}`,
      providesTags: ["Employee"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductQuery,
  useGetEmployeeQuery,
  useGetStaffQuery,
  useGetDoctorQuery,
  useSetProductQuery,
  useGetDashboardQuery,
  useGetAdminsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetTransactionsQuery,
  useGetUserPerformanceQuery
} = api;
