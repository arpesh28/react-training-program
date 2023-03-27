import { createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
  name: "story",
  initialState: {
    storyList: [],
  },
  reducers: {
    getStories: (state, action) => {
      state.storyList = action.payload;
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

export const { getStories, deleteStory } = storySlice.actions;
export default storySlice.reducer;
