import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchData = createAsyncThunk(
  "api/fetchData",
  async ({ category, difficulty }) => {
    const baseUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await axios.get(baseUrl);
    return response.data.results;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
        sessionStorage.setItem("fetchQuestions", JSON.stringify(state.data));
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
