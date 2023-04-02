const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    pId: {
      type: ObjectId,
      ref: "products",
    },
    pQuantity: {
      type: Number,
      default: 0,
    },
    uId: {
      type: ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
