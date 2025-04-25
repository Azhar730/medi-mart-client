import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};
export type TAuthState = {
  user: null | TUser;
  accessToken: null | string;
};

const initialState: TAuthState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.accessToken = token;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
