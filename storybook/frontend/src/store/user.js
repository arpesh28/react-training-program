import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    loading: true,
    errors: null,
    authorList: [],
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
    getAuthors: (state, action) => {
      state.authorList = action.payload;
      return state;
    },
  },
});

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}users/me?populate=*`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );
    dispatch(getUser(res.data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setLoading(false));
    console.error("error:", err);
  }
};

export const loadAuthors = (callback) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}users?populate=*`
    );
    dispatch(getAuthors(res.data));
    callback();
  } catch (err) {
    callback();
  }
};

export const { getUser, setLoading, getAuthors } = userSlice.actions;

export default userSlice.reducer;
