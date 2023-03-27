import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    loading: true,
    errors: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
    getUser: (state, action) => {
      state.userDetails = action.payload;
      return state;
    },
  },
});

export const { getUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
