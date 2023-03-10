import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVideos } from "./videosApi";

const initialState = {
  videos: [],
  isLoading: false,
  isError: false,
  error: false,
};

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async ({ tags, search, author }) => {
    const videos = await getVideos({ tags, search, author });
    return videos;
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.videos = [];
        state.error = action.error?.message;
      });
  },
});

export default videoSlice.reducer;
