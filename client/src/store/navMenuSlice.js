import { createSlice } from "@reduxjs/toolkit";

const navMenuSlice = createSlice({
  name: "navMenu",
  initialState: false,
  reducers: {
    toggleNavMenu: (state) => !state,
  },
});

export default navMenuSlice.reducer;
export const { toggleNavMenu } = navMenuSlice.actions;
