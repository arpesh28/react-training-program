import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    productDetails: null,
    loading: true,
  },
  reducers: {
    productReceived: (state, action) => {
      state.productList = action.payload;
      return state;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
    singleProductReceived: (state, action) => {
      state.productDetails = action.payload;
      return state;
    },
  },
});

export const loadProducts = (callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}product/all-product`
    );
    dispatch(productReceived(res.data.Products));
    callback(res);
    dispatch(setLoading(false));
  } catch (err) {
    callback(err.response);
    dispatch(setLoading(false));
  }
};

export const loadSingleProduct = (data, callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}product/single-product`,
      data
    );
    dispatch(singleProductReceived(res.data.Product));
    callback(res);
    dispatch(setLoading(false));
  } catch (err) {
    callback(err.response);
    dispatch(setLoading(false));
  }
};

export const { productReceived, setLoading, singleProductReceived } =
  productSlice.actions;
export default productSlice.reducer;
