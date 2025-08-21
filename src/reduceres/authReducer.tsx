import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import { AuthState, LoggedInUser, StudentData } from "../utils/types";

const initialState: AuthState = {
  users: [],
  students : [],
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
    listStudents: (state, action: PayloadAction<StudentData[]>) => {
      state.students = action.payload
      return
    },
    logout : (state) => {
      state.loggedInUser = null
      state.users = []
      state.students = []
      return
    }
  },
});

export const { logInUser, listStudents, logout } = authSlice.actions;

export default authSlice.reducer;
