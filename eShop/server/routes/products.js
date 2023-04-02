const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//  Wishlist
router.post("/wishlist", productController.addToWishList);
router.get("/wishlist", productController.getMyWishlist);
router.delete("/wishlist", productController.removeWishlistProduct);

//  Cart
router.post("/cart", productController.addToCart);
router.get("/cart", productController.getMyCart);
router.delete("/cart", productController.removeCartProduct);

//  Product
router.post("/add-product", upload.any(), productController.postAddProduct);
router.put("/edit-product", upload.any(), productController.postEditProduct);
router.delete("/delete-product", productController.getDeleteProduct);
router.get("/single-product", productController.getSingleProduct);
router.get("/all-product", productController.getAllProduct);
router.get("/product-by-category", productController.getProductByCategory);
router.get("/product-by-price", productController.getProductByPrice);

//  Review
router.post("/add-review", productController.postAddReview);
router.delete("/delete-review", productController.deleteReview);

module.exports = router;
