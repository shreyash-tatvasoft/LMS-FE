import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import { AuthState, LoggedInUser } from "../utils/types";

const initialState: AuthState = {
  users: [],
  loggedInUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<LoggedInUser>) => {      
          state.loggedInUser = action.payload
          return
    },
    logout : (state) => {
      state.loggedInUser = null
      return
    }
  },
});

export const { logInUser, logout } = authSlice.actions;

export default authSlice.reducer;
