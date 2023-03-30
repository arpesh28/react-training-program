import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const miscSlice = createSlice({
  name: "misc",
  initialState: {
    categoryList: [],
    loading: false,
  },
  reducers: {
    categoryReceived: (state, action) => {
      state.categoryList = action.payload;
      return state;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export const loadCategories = (callback) => async (dispatch) => {
  setLoading(true);
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}category/all-category`
    );
    dispatch(categoryReceived(res.data.Categories));
    callback(res);
    setLoading(false);
  } catch (err) {
    callback(err.response);
    setLoading(false);
  }
};

export const { categoryReceived, setLoading } = miscSlice.actions;
export default miscSlice.reducer;
