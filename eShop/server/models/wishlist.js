const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const wishListSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "products",
    },
    uId: {
      type: ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const wishListModel = mongoose.model("wishlist", wishListSchema);
module.exports = wishListModel;
