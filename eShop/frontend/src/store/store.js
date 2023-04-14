import { configureStore } from "@reduxjs/toolkit";

//  Slices
import misc from "./misc";
import products from "./products";
import auth from "./auth";
import user from "./user";
import order from "./order";

export default configureStore({
  reducer: {
    misc,
    products,
    auth,
    user,
    order,
  },
});
