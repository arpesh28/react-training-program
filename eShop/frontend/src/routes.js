import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//  Screens
import HomeScreen from "screens/homescreen";
import ProductDetails from "screens/productDetails";

//  User Routes
import UserDetails from "screens/admin/user/userDetails";

//  Misc Routes
import CategoryListing from "screens/admin/categories/categories";
import Wishlist from "screens/wishlist";

//  Product Routes
import ProductListing from "screens/admin/products/productListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />

        {/* User Routes */}
        <Route exact path="/user-details" element={<UserDetails />} />

        {/* Misc Routes */}
        <Route exact path="/categories" element={<CategoryListing />} />
        <Route exact path="/wish-list" element={<Wishlist />} />

        {/* Products Routes */}
        <Route exact path="/products" element={<ProductListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
