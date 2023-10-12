import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPost = createAsyncThunk("api/fetchPost", async () => {
  const response = await axios.get("https://quizpro.onrender.com/get");
  return response.data;
});

const postApiSlice = createSlice({
  name: "postApi",
  initialState: {
    userData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export default postApiSlice.reducer;
