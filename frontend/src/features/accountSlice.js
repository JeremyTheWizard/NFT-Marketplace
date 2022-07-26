import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    changeAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { changeAccount } = accountSlice.actions;

export default accountSlice.reducer;
