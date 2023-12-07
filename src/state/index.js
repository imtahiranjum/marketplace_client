import { createSlice } from "@reduxjs/toolkit";
import { useGetUserIdQuery } from "./api";

const initialState = {
  userId: "",
  userEmail: "",
  isLoggedIn: false,
  // mode: "dark",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      // state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
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
export const { setUserEmail, setUserId, setIsLoggedIn } = globalSlice.actions;
export default globalSlice.reducer;
