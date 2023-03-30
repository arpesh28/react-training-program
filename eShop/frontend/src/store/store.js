import { configureStore } from "@reduxjs/toolkit";

//  Slices
import misc from "./misc";
import products from "./products";

export default configureStore({
  reducer: {
    misc,
    products,
  },
});
