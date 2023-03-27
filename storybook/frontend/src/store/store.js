import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import storySlice from "./stories";

export default configureStore({
  reducer: {
    user: userSlice,
    stories: storySlice,
  },
});
