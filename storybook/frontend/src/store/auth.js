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
  try {
    dispatch(setLoading(true));
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}auth/local/`,
      data
    );
    localStorage.setItem("jwt", res.data.jwt);
    dispatch(setLoading(false));
    callback(res);
  } catch (err) {
    dispatch(setLoading(false));
    callback(err.response);
    console.log("error:", err);
  }
};

export const register = (data, callback) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}auth/local/register`,
      data
    );
    localStorage.setItem("jwt", res.data.jwt);
    dispatch(setLoading(false));
    callback(res);
  } catch (err) {
    dispatch(setLoading(false));
    callback(err.response);
  }
};

export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
