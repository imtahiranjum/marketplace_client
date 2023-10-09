import { createSlice } from "@reduxjs/toolkit";
import { useGetUserIdQuery } from "./api";

const initialState = {
  userId: "",
  userEmail: "",
  // mode: "dark",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      // state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setUserId: (state, userId) => {
      console.log(state.userId);
      state.userId = userId.payload;
      console.log(state.userId);
    },
    setUserEmail: (state, userEmail) => {
      console.log(state.userEmail);
      state.userEmail = userEmail.payload;
      console.log(state.userEmail);
      state.userId = useGetUserIdQuery(userEmail);
    },
  },
});

// export const {setMode} = globalSlice.actions;
export const { setUserEmail, setUserId } = globalSlice.actions;
export default globalSlice.reducer;
