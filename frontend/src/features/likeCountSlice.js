import { createSlice } from "@reduxjs/toolkit";

const likeCountSlice = createSlice({
  name: "likeCount",
  initialState: { count: 0 },
  reducers: {
    xFunc(state) {
      state.count = 1;
    },
  },
});

export const xActions = xSlice.actions;
