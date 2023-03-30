import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const storySlice = createSlice({
  name: "story",
  initialState: {
    storyList: [],
    allCategories: [],
  },
  reducers: {
    getStories: (state, action) => {
      state.storyList = action.payload;
      return state;
    },
    getAllCategories: (state, action) => {
      state.allCategories = action.payload;
      return state;
    },
    deleteStory: (state, action) => {
      const newState = { ...state };
      const newStories = [...newState.storyList];
      let deleteInd = "";
      newStories.forEach((item, index) => {
        if (item.id === action.payload) deleteInd = index;
      });
      newStories.splice(deleteInd, 1);
      state.storyList = newStories;
      return state;
    },
  },
});

export const loadStories = (params, callback) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}stories?`, {
      params,
    });
    dispatch(getStories(res.data.data));
    console.log("res:", res);
    callback();
  } catch (err) {
    callback();
    console.error("error:", err);
  }
};
export const loadCategories = (callback) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}categories`);
    dispatch(getAllCategories(res.data.data));
    callback();
  } catch (err) {
    callback();
  }
};
export const addImage = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}upload`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};
export const addStory = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}stories`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};
export const updateStory = (data, id, callback) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}stories/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );
    callback(res);
  } catch (err) {
    callback(err.response);
  }
};

export const { getStories, deleteStory, getAllCategories } = storySlice.actions;
export default storySlice.reducer;
