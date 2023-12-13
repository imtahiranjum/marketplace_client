import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "OnSaleCattle",
    "OnSaleCattleDetails",
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
    "Images",
    "Coversation",
    "Chat"
  ],
  endpoints: (build) => ({
    getQuestions: build.query({
      query: (onSaleCattleId) => `onsalecattle/getquestions/${onSaleCattleId}`,
      providesTags: ["Question", "OnSaleCattle", "Answer", "OnSaleCattleDetails"],
    }),
    getMessages: build.query({
      query: (conversationId) => `messages/${conversationId}`,
      providesTags: ["User", "Coversation", "Chat"],
    }),
    getConversations: build.query({
      query: (id) => `conversations/${id}`,
      providesTags: ["User", "Coversation", "Chat"],
    }),
    getMutualConversations: build.query({
      query: (id) => `conversations/find/${id}/${id}`,
      providesTags: ["User", "Coversation", "Chat"],
    }),
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
      providesTags: ["OnSaleCattle", "AllCattle", "Images", "OnSaleCattleDetails"],
    }),
    getOnSaleCattleDetails: build.query({
      query: (id) => `onsalecattle/getonsalecattledetails/${id}`,
      providesTags: ["OnSaleCattleDetails"],
    }),
    getSellerByEmail: build.query({
      query: (email) => `user/seller/email/${email}`,
      providesTags: ["Seller", "User"],
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
      providesTags: ["OnSaleCattle", "AllCattle"],
    }),

    getSpecificOnSaleCattle: build.query({
      query: (id) => `onsalecattle/specificonsalecattle/${id}`,
      providesTags: ["SpecificOnSaleCattle", "OnSaleCattle"],
    }),
    getAnswer: build.query({
      query: (questionId) => `general/answer/${questionId}`,
      providesTags: ["User", "Question", "Answer"],
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
      invalidatesTags: ["Seller", "User"],
    }),
    loginUser: build.mutation({
      query: (newEmail, password) => ({
        url: "user/signin",
        method: "POST",
        body: newEmail,
        password,
      }),
      invalidatesTags: ["User", "OnSaleCattleDetails"],
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
      invalidatesTags: ["Question", "OnSaleCattle", "Answer", "OnSaleCattleDetails"],
    }),
    addAnswer: build.mutation({
      query: (answer, questionId) => ({
        url: "general/addanswer",
        method: "POST",
        body: answer,
        questionId,
      }),
      invalidatesTags: ["Question", "OnSaleCattle", "Answer", "OnSaleCattleDetails"],
    }),
    addToFavorite: build.mutation({
      query: (onSaleCattleId, userId) => ({
        url: "user/addtofavorite",
        method: "POST",
        body: onSaleCattleId,
        userId,
      }),
      invalidatesTags: ["OnSaleCattle", "Favorite", "OnSaleCattleDetails"],
    }),
    removeFromFavorite: build.mutation({
      query: (onSaleCattleId, userId) => ({
        url: "user/removefromfavorite",
        method: "DELETE",
        body: onSaleCattleId,
        userId,
      }),
      invalidatesTags: ["OnSaleCattle", "OnSaleCattleDetails"],
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
      invalidatesTags: ["OnSaleCattle", "OnSaleCattleDetails"],
    }),
    changeProfileImage: build.mutation({
      query: (userId, image) => ({
        url: "user/changeprofileimage",
        method: "POST",
        body: userId,
        image,
      }),
      invalidatesTags: ["Image", "User"],
    }),
    changeProfileBio: build.mutation({
      query: (userId, bio) => ({
        url: "user/changeprofilebio",
        method: "POST",
        body: userId,
        bio,
      }),
      invalidatesTags: ["User"],
    }),
    changeSellerDescription: build.mutation({
      query: (sellerId, description) => ({
        url: "user/changesellerdescription",
        method: "POST",
        body: sellerId,
        description,
      }),
      invalidatesTags: ["User", "Seller"],
    }),
    addNewConversation: build.mutation({
      query: (userId, sellerId) => ({
        url: "conversations/addnewconversation",
        method: "POST",
        body: userId,
        sellerId,
      }),
      invalidatesTags: ["User", "Coversation"],
    }),
    addNewMessage: build.mutation({
      query: (coversationId, userId, text) => ({
        url: "conversations/addnewconversation",
        method: "POST",
        body: coversationId,
        userId,
        text,
      }),
      invalidatesTags: ["User", "Coversation"],
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
  useChangeProfileImageMutation,
  useChangeProfileBioMutation,
  useGetConversationsQuery,
  useGetMutualConversationsQuery,
  useAddNewConversationMutation,
  useGetMessagesQuery,
  useAddNewMessageMutation,
  useChangeSellerDescriptionMutation,
  useGetQuestionsQuery,
} = api;
