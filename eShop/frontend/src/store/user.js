import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { create } from "joi-browser";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
  },
  reducers: {
    userSuccess: (state, action) => {
      state.userDetails = action.payload;
      return state;
    },
  },
});

export const loadUser = (params, callback) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}user/single-user`,
      {
        params: params,
      }
    );
    dispatch(userSuccess(res.data.User));
    callback(res);
  } catch (err) {
    callback(err);
  }
};

export const { userSuccess } = userSlice.actions;
export default userSlice.reducer;
