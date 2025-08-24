// src/store/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sideBarActiveLink: "/",
    isMobileDimention: false,
    isDesktopDimention: true,
  },
  reducers: {
    setSideBarActiveLink(state, action) {
      state.sideBarActiveLink = action.payload;
    },
    setIsMobileDimention(state, action) {
      state.isMobileDimention = !!action.payload;
      state.isDesktopDimention = !action.payload;
    },
    setIsDesktopDimention(state, action) {
      state.isDesktopDimention = !!action.payload;
      state.isMobileDimention = !action.payload;
    },
  },
});

export const { setSideBarActiveLink, setIsMobileDimention, setIsDesktopDimention } =
  uiSlice.actions;

export default uiSlice.reducer;
