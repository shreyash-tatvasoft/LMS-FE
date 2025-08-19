import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import { AuthState, RegistrationFields, LogInFields } from "../utils/types";

const initialState: AuthState = {
  users: [],
  loggedInUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<RegistrationFields>) => {
        state.users.push(action.payload);
        return; 
    },
    logInUser: (state, action: PayloadAction<LogInFields>) => {
      const findItem = state.users.find(
        (item) => item.email === action.payload.email
      );
      
      if (findItem) {
          state.loggedInUser = findItem
          return
      } 
    },
    logout : (state) => {
      state.loggedInUser = null
      return
    }
  },
});

export const { addNewUser, logInUser, logout } = authSlice.actions;

export default authSlice.reducer;
