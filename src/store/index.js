// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import studentsReducer from "./slices/studentSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    ui: uiReducer,
  },
  // middleware and devTools left to defaults (RTK handles thunk)
});

export default store;
