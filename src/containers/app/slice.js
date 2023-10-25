import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: !!localStorage.getItem("userData"),
  isAdmin: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth-container",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      localStorage.clear();
      sessionStorage.clear();
    },
    login: (state, action) => {
      state.isLogin = true;
      state.isAdmin = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
