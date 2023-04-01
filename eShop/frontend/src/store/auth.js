import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export const login = (data, callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}signin`,
      data
    );
    localStorage.setItem("x-auth-token", res.data.token);
    callback(res);
    dispatch(setLoading(false));
  } catch (err) {
    console.error(err.response);
    callback(err.response);
    dispatch(setLoading(false));
  }
};

export const register = (data, callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}signup`,
      data
    );
    callback(res);
    dispatch(setLoading(false));
  } catch (err) {
    callback(err.response);
    dispatch(setLoading(false));
  }
};

export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
