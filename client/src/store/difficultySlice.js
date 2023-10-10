import { createSlice } from "@reduxjs/toolkit";

const difficultySlice = createSlice({
  name: "difficulty",
  initialState: {
    difficultyDrop: false,
    selectedDifficulty: "",
  },
  reducers: {
    toggleDifficultyDrop: (state) => {
      state.difficultyDrop = !state.difficultyDrop;
    },
    setSelectedDifficulty: (state, action) => {
      state.selectedDifficulty = action.payload;
    },
  },
});

export default difficultySlice.reducer;
export const { toggleDifficultyDrop, setSelectedDifficulty } =
  difficultySlice.actions;
