import { createSlice } from "@reduxjs/toolkit";

const profileMenuSlice = createSlice({
  name: "profileMenu",
  initialState: false,
  reducers: {
    toggleProfileMenu: (state) => !state,
  },
});

export default profileMenuSlice.reducer;
export const { toggleProfileMenu } = profileMenuSlice.actions;
