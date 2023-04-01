import { configureStore } from "@reduxjs/toolkit";

//  Slices
import misc from "./misc";
import products from "./products";
import auth from "./auth";

export default configureStore({
  reducer: {
    misc,
    products,
    auth,
  },
});
