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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
});

// export const {setMode} = globalSlice.actions;
export const { setUserEmail, setUserId } = globalSlice.actions;
export default globalSlice.reducer;
