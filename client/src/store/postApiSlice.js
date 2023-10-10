import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPost = createAsyncThunk("api/fetchPost", async () => {
  const response = await axios.get("http://localhost:5000/get");
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
