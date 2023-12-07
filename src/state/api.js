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
    "Seller",
    "SpecificOnSaleCattle",
    "Question",
    "Answer",
    "Cattle",
    "AllCattle",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/id/${id}`,
      providesTags: ["User"],
    }),
    getSellerById: build.query({
      query: (id) => `user/seller/id/${id}`,
      providesTags: ["Seller", "User"],
    }),
    getOnSaleCattleImages: build.query({
      query: (id) => `onsalecattle/getonsalecattleimages/${id}`,
      providesTags: ["OnSaleCattle"],
    }),
    getOnSaleCattleDetails: build.query({
      query: (id) => `onsalecattle/getonsalecattledetails/${id}`,
      providesTags: ["OnSaleCattle"],
    }),
    getSellerByEmail: build.query({
      query: (email) => `user/seller/email/${email}`,
      providesTags: ["Seller"],
    }),
    getUserByEmail: build.query({
      query: (userEmail) => `user/email/${userEmail}`,
      providesTags: ["User"],
    }),
    getUserId: build.query({
      query: (email) => `user/${email}`,
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
    getAnswer: build.query({
      query: (questionId) => `general/answer/${questionId}`,
      providesTags: ["User"],
    }),
    getOneCattle: build.query({
      query: (id) => `cattle/id/${id}`,
      providesTags: ["Cattle"],
    }),
    createUser: build.mutation({
      query: (firstName, lastName, newEmail, password, passwordVerify) => ({
        url: "user/signup",
        method: "POST",
        body: firstName,
        lastName,
        newEmail,
        password,
        passwordVerify,
      }),
      invalidatesTags: ["User"],
    }),
    createSeller: build.mutation({
      query: (
        name,
        displayName,
        description,
        rating,
        contact_info,
        userEmail
      ) => ({
        url: "user/createseller",
        method: "POST",
        body: name,
        displayName,
        description,
        rating,
        contact_info,
        userEmail,
      }),
      invalidatesTags: ["Seller"],
    }),
    loginUser: build.mutation({
      query: (newEmail, password) => ({
        url: "user/signin",
        method: "POST",
        body: newEmail,
        password,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    addNewOnSaleCattle: build.mutation({
      query: (
        name,
        seller_info,
        images,
        gender,
        age,
        breed,
        color,
        weight,
        category,
        title,
        price,
        description
      ) => ({
        url: `onsalecattle/addcattletosale`,
        method: "POST",
        body: name,
        seller_info,
        images,
        gender,
        age,
        breed,
        color,
        weight,
        category,
        title,
        price,
        description,
      }),
      invalidatesTags: ["AllCattle", "OnSaleCattle"],
    }),
    addQuestion: build.mutation({
      query: (onsalecattle, description, user) => ({
        url: "general/addquestion",
        method: "POST",
        body: onsalecattle,
        description,
        user,
      }),
      invalidatesTags: ["Question", "OnSaleCattle"],
    }),
    addQuestion: build.mutation({
      query: (onsalecattle, description, user) => ({
        url: "general/addquestion",
        method: "POST",
        body: onsalecattle,
        description,
        user,
      }),
      invalidatesTags: ["Question", "OnSaleCattle"],
    }),
    addAnswer: build.mutation({
      query: (answer, questionId) => ({
        url: "general/addanswer",
        method: "POST",
        body: answer,
        questionId,
      }),
      invalidatesTags: ["Question", "OnSaleCattle"],
    }),
    addToFavorite: build.mutation({
      query: (onSaleCattleId, userId) => ({
        url: "user/addtofavorite",
        method: "POST",
        body: onSaleCattleId,
        userId,
      }),
      invalidatesTags: ["Question", "OnSaleCattle"],
    }),
    removeFromFavorite: build.mutation({
      query: (onSaleCattleId, userId) => ({
        url: "user/removefromfavorite",
        method: "DELETE",
        body: onSaleCattleId,
        userId,
      }),
      invalidatesTags: ["Question", "OnSaleCattle"],
    }),
    addOneCattleToSale: build.mutation({
      query: (title, description, price, cattle_id) => ({
        url: "onsalecattle/addcattletosale",
        method: "POST",
        body: title,
        description,
        price,
        cattle_id,
      }),
      invalidatesTags: ["OnSaleCattle"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetOnSaleCattleQuery,
  useGetSpecificOnSaleCattleQuery,
  useCreateUserMutation,
  useGetUserIdQuery,
  useGetSellerByEmailQuery,
  useGetSellerByIdQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserByEmailQuery,
  useGetOnSaleCattleImagesQuery,
  useGetOnSaleCattleDetailsQuery,
  useCreateSellerMutation,
  useAddNewOnSaleCattleMutation,
  useAddQuestionMutation,
  useGetAnswerQuery,
  useAddOneCattleToSaleMutation,
  useGetOneCattleQuery,
  useAddAnswerMutation,
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
} = api;
