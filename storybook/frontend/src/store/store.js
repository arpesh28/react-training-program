import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import storySlice from "./stories";
import authSlice from "./auth";

export default configureStore({
  reducer: {
    user: userSlice,
    stories: storySlice,
    auth: authSlice,
  },
});
