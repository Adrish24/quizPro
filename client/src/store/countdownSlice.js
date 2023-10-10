import { createSlice } from "@reduxjs/toolkit";

const countdownSlice = createSlice({
  name: "countdown",
  initialState: {
    seconds: 30,
    progress: 0,
  },
  reducers: {
    resetTimer: (state) => {
      state.seconds = 30;
      state.progress = 0;
    },
    updateTimer: (state) => {
      if (state.seconds > 0) {
        state.seconds -= 1;
        state.progress += 100/30;
      }
    },
  },
});

export default countdownSlice.reducer;
export const { resetTimer, updateTimer } = countdownSlice.actions;
