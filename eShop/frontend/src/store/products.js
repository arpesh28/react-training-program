import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    loading: false,
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

export const { productReceived, setLoading } = productSlice.actions;
export default productSlice.reducer;
