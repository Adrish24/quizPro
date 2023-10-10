import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryDrop: false,
    selectedCategory: "",
    selectedCategoryValue:0,
  },
  reducers: {
    toggleCategoryDrop: (state) => {
      state.categoryDrop = !state.categoryDrop;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedCategoryValue: (state, action) => {
        state.selectedCategoryValue = action.payload;
    }
  },
});

export default categorySlice.reducer;
export const { toggleCategoryDrop, setSelectedCategory, setSelectedCategoryValue } =
  categorySlice.actions;
