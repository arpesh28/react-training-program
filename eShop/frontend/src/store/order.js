import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    clientToken: "",
    loading: false,
    allOrder: [],
  },
  reducers: {
    tokenReceived: (state, action) => {
      state.clientToken = action.payload;
      return state;
    },
    allOrdersReceived: (state, action) => {
      state.allOrder = action.payload;
      return state;
    },
  },
});
const braintreeURL = `${process.env.REACT_APP_API_URL}braintree/`;
const orderURL = `${process.env.REACT_APP_API_URL}order/`;

export const loadToken = () => async (dispatch) => {
  try {
    const res = await axios.get(braintreeURL + "get-token");
    dispatch(tokenReceived(res.data.clientToken));
  } catch (err) {}
};

export const brainTreePayment = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post(braintreeURL + "payment", data);
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

export const createOrder = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post(orderURL + "create-order", data);
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

export const loadAllOrders = (callback) => async (dispatch) => {
  try {
    const res = await axios.get(orderURL + "get-all-orders");
    dispatch(allOrdersReceived(res.data.Orders));
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

export const deleteOrder = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.delete(orderURL + "delete-order", { data });
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

export const updateOrder = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.put(orderURL + "update-order", data);
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

export const { tokenReceived, allOrdersReceived } = orderSlice.actions;

export default orderSlice.reducer;
