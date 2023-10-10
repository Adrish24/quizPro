import { createSlice } from "@reduxjs/toolkit";

const leaderBoardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    showLeaderBoard: false,
  },
  reducers: {
    toggleLeaderBoard: (state, action) => {
      state.showLeaderBoard = action.payload;
    },
  },
});

export default leaderBoardSlice.reducer;
export const { toggleLeaderBoard } = leaderBoardSlice.actions;
