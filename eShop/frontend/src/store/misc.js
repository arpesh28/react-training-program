import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const miscSlice = createSlice({
  name: "misc",
  initialState: {
    categoryList: [],
    loading: false,
    wishlist: [],
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
    wishlistReceived: (state, action) => {
      state.wishlist = action.payload;
      return state;
    },
  },
});

//  Category API's
export const loadCategories = (callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}category/all-category`
    );
    dispatch(categoryReceived(res.data.Categories));
    callback(res);
    dispatch(setLoading(false));
  } catch (err) {
    callback(err.response);
    dispatch(setLoading(false));
  }
};

export const addCategory = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}category/add-category`,
      data,
      {
        headers: {
          token: localStorage.getItem("x-auth-token"),
        },
      }
    );
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

export const editCategory = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}category/edit-category`,
      data,
      {
        headers: {
          token: localStorage.getItem("x-auth-token"),
        },
      }
    );
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

export const deleteCategory = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}category/delete-category`,
      {
        headers: {
          token: localStorage.getItem("x-auth-token"),
        },
        data,
      }
    );
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

//  Wishlist API's
export const loadWishlist = (params, callback) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}product/wishlist`,
      {
        params,
      }
    );
    dispatch(wishlistReceived(res.data.wishList));
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};
export const addToWishlist = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}product/wishlist`,
      data
    );
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};
export const removeWishlist = (data, callback) => async (dispatch) => {
  console.log("data:", data);
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}product/wishlist`,
      {
        data,
      }
    );
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

export const { categoryReceived, setLoading, wishlistReceived } =
  miscSlice.actions;
export default miscSlice.reducer;
